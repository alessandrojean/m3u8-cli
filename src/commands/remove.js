const {Command, flags} = require('@oclif/command')
const {Channel, Sequelize} = require('../models')

class RemoveCommand extends Command {
  async run() {
    const {flags} = this.parse(RemoveCommand)
    const name = flags.name || ''
    const id = flags.id || -1

    if (name === '' && id === -1) {
      this.error('You need to specify an id or name to remove.')
      return
    }

    let where
    if (id === -1) {
      where = {name: {[Sequelize.Op.like]: [`%${name}%`]}}
    } else {
      where = {id: parseInt(id, 10)}
    }

    await Channel.destroy({where})
    this.log('Channel removed.')
  }
}

RemoveCommand.description = 'Remove a channel from the database if exists'

RemoveCommand.flags = {
  id: flags.string({
    char: 'i',
    description: 'id to remove',
    exclusive: ['name'],
  }),
  name: flags.string({
    char: 'n',
    description: 'name to remove',
    exclusive: ['id'],
  }),
}

module.exports = RemoveCommand
