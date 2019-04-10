const {Command, flags} = require('@oclif/command')
const {Channel} = require('../../models')
const {cli} = require('cli-ux')

class IndexCommand extends Command {
  async run() {
    const {flags} = this.parse(IndexCommand)
    const channels = await Channel.findAll({ raw: true });

    if (channels.length > 0) {
      cli.table(channels, {
        id: {}, 
        name: {},
        color: {},
        aspectRatio: {
          header: 'AR'
        },
        country: {},
        continent: {}
      }, flags)
    } else {
      this.log('No channels in the database.')
    }
  }
}

IndexCommand.description = `List the channels in the database.`

IndexCommand.flags = {
  ...cli.table.flags({ only: ['filter'] })
}

module.exports = IndexCommand
