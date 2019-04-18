const {Command, flags} = require('@oclif/command')
const {Channel, Sequelize} = require('../models')

class FindCommand extends Command {
  async run() {
    const {flags} = this.parse(FindCommand)
    const name = flags.name || ''
    const id = flags.id || -1

    if (name === '' && id === -1) {
      this.error('You need to specify an id or name to search.')
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
      const {streamUrl, createdAt, updatedAt, ...channel} = result
      // eslint-disable-next-line no-console
      console.table(channel)
    } else {
      this.error('No channel found.')
    }
  }
}

FindCommand.description = 'Find a channel with the id or name specified'

FindCommand.flags = {
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

module.exports = FindCommand
