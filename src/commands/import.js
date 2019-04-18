const {Command} = require('@oclif/command')
const {promisify} = require('util')
const path = require('path')
const {readFile} = require('fs')
const {Channel} = require('../models')

const readFilePromise = promisify(readFile)

const TOKEN_REGEX = /(.*)="(.*)"/
const COLOR_REGEX = /^#EXTBG: (.*)$/
const URL_REGEX = /^https?/

const toCamelCase = string => {
  return string.replace(/([-_][a-z])/ig, s => s.toUpperCase().replace(/-|_/, ''))
}

class ImportCommand extends Command {
  async run() {
    const {args} = this.parse(ImportCommand)
    const file = path.join(process.cwd(), args.file)

    const fileContent = await readFilePromise(file, 'utf8')
    const groups = fileContent
      .split('\n\n')
      .filter(lines => lines.startsWith(/^#EXTINF:-1/))

    for (let group of groups) {
      const channel = {}
      const lines = group.split('\n')

      this.processFirstLine(channel, lines[0])
      this.processSecondLine(channel, lines[1])

      if (lines.length === 3) {
        channel.streamUrl = lines[2]
      }

      this.log(`Channel ${channel.name} recognized.`)
      try {
        // eslint-disable-next-line no-await-in-loop
        await Channel.create(channel)
      } catch (error) {
        this.error(error.message)
      }
    }
  }

  processFirstLine(channel, line) {
    let [tokens, name] = line.split(',')
    channel.name = name.trim()

    tokens = tokens
      .match(/\s*([^= ]+)="([^"]+)"/g)
      .map(token => token.trim())

    for (let token of tokens) {
      const [attribute, value] = token.match(TOKEN_REGEX).slice(-2)

      channel[toCamelCase(attribute)] = value
    }

    channel.aspectRatio = channel.aspectRatio || '16:9'
  }

  processSecondLine(channel, line) {
    if (line.match(COLOR_REGEX)) {
      channel.color = line.match(COLOR_REGEX)[1]
    } else if (line.match(URL_REGEX)) {
      channel.streamUrl = line
    }
  }
}

ImportCommand.description = 'Import an existing playlist'

ImportCommand.args = [
  {name: 'file', required: true, description: 'm3u8 playlist to import'},
]

module.exports = ImportCommand
