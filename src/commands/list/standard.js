const {Command, flags} = require('@oclif/command')
const axios = require('axios')
const {cli} = require('cli-ux')

const API = 'http://api.ss-iptv.com/?action=getChannelsList'

class StandardCommand extends Command {
  async run() {
    const {args} = this.parse(StandardCommand)
    const {term} = args

    const {data} = await axios.get(API)
    const channels = data.filter(({title}) => title.match(new RegExp(term, 'i')) ? true : false)

    if (channels.length > 0) {
      cli.table(channels, {
        id: {},
        title: { header: 'Name' }
      })
    } else {
      this.log('No results')
    }
  }
}

StandardCommand.description = `Search in the standard SS IPTV channels`

StandardCommand.args = [
  { name: 'term', required: true, description: 'term to filter'}
]

module.exports = StandardCommand
