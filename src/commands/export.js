const {Command, flags} = require('@oclif/command')
const {promisify} = require('util')
const {writeFile} = require('fs')
const path = require('path')
const {Channel} = require('../models')
const {defaultOutput} = require('../config/exporter')

const writeFilePromise = promisify(writeFile)

class ExportCommand extends Command {
  async run() {
    const {flags} = this.parse(ExportCommand)
    const output = flags.output ? path.join(process.cwd(), flags.output) : defaultOutput

    const channels = await Channel.findAll({
      order: [
        ['continent', 'ASC'],
        ['country', 'ASC'],
        ['name', 'ASC'],
      ],
    })

    let fileContent = '#EXTM3U\n'
    for (let tv of channels) {
      const tvgName = tv.tvgName ? `tvg-name="${tv.tvgName}" ` : ''
      const aspectRatio = tv.aspectRatio ? `aspect-ratio="${tv.aspectRatio}" ` : ''

      fileContent += `\n#EXTINF:-1 ${tvgName}tvg-logo="${tv.tvgLogo}" ${aspectRatio}type="stream", ${tv.name}`
      fileContent += `\n#EXTBG: ${tv.color}`
      fileContent += `\n${tv.streamUrl}\n`
    }

    await writeFilePromise(output, fileContent)
    this.log(`Exported list with success in ${output}`)
  }
}

ExportCommand.description = 'Export the database channels to a M3U8 file.'

ExportCommand.flags = {
  output: flags.string({char: 'o', description: 'non-default output file'}),
}

module.exports = ExportCommand
