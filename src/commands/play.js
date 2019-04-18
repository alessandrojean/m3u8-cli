const {Command, flags} = require('@oclif/command')
const {promisify} = require('util')
const {exec, spawn} = require('child_process')
const {Channel, Sequelize} = require('../models')

const execPromise = promisify(exec)

class PlayCommand extends Command {
  async run() {
    const {flags} = this.parse(PlayCommand)
    const name = flags.name || ''
    const id = flags.id || -1

    if (name === '' && id === -1) {
      this.error('You need to specify an id or name to play.')
      return
    }

    let where
    if (id === -1) {
      where = {name: {[Sequelize.Op.like]: [`%${name}%`]}}
    } else {
      where = {id: parseInt(id, 10)}
    }

    const result = await Channel.findOne({raw: true, where})
    if (result) {
      const {streamUrl, aspectRatio} = result
      const size = aspectRatio === '16:9' ?
        ['-x', '1280', '-y', '720'] :
        ['-x', '1280', '-y', '960']

      const args = [...size, streamUrl]
      const options = {detached: true, stdio: 'ignore'}

      this.log('Running ffplay in background.')
      spawn('ffplay', args, options).unref()
    } else {
      this.error('No channel found.')
    }
  }
}

PlayCommand.description = 'Play a channel with the id or name specified'

PlayCommand.flags = {
  id: flags.string({
    char: 'i',
    description: 'id to search',
    exclusive: ['name'],
  }),
  name: flags.string({
    char: 'n',
    description: 'name to search',
    exclusive: ['id'],
  }),
}

module.exports = PlayCommand
