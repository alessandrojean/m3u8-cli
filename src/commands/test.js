const {Command, flags} = require('@oclif/command')
const axios = require('axios')
const ora = require('ora')
const chalk = require('chalk')
const {cli} = require('cli-ux')
const {Channel, Sequelize} = require('../models')

class TestCommand extends Command {
  async run() {
    const {flags} = this.parse(TestCommand)
    const specific = flags.channel

    let channels
    if (specific) {
      const name = flags.name || ''
      const id = flags.id || -1

      if (name === '' && id === -1) {
        this.error('You need to specify an id or name to test.')
        return
      }

      let where
      if (id === -1) {
        where = {name: {[Sequelize.Op.like]: [`%${name}%`]}}
      } else {
        where = {id: parseInt(id, 10)}
      }

      channels = [await Channel.findOne({
        attributes: ['id', 'name', 'streamUrl'],
        where,
        raw: true,
      })]
    } else {
      channels = await Channel.findAll({
        attributes: ['id', 'name', 'streamUrl'],
        raw: true,
      })
    }

    const spinner = ora('Doing requests').start()

    let withError = await Promise.all(
      channels.map(({id, name, streamUrl}) => {
        return new Promise((resolve, _) => {
          axios.get(streamUrl, {timeout: 10000})
            .then(_ => resolve())
            .catch(error => {
              const message = error.response ?
                'Status ' + error.response.status :
                error.message

              resolve({id, name, error: message})
            })
        })
      })
    )

    spinner.stop()

    withError = withError
      .filter(x => x)
      .map(c => {
        return {status: chalk.red('[ERROR]'), name: c.name, error: c.error}
      })

    if (withError.length === 0) {
      this.log('All the channels are working.')
    } else {
      cli.table(withError, {status: {}, name: {}, error: {}})
    }
  }
}

TestCommand.description = 'Test the stream URLs.'

TestCommand.flags = {
  channel: flags.boolean({
    char: 'c',
    description: 'test specific',
    default: false,
  }),
  id: flags.string({
    char: 'i',
    description: 'id to remove',
    exclusive: ['name'],
    dependsOn: ['channel'],
  }),
  name: flags.string({
    char: 'n',
    description: 'name to remove',
    exclusive: ['id'],
    dependsOn: ['channel'],
  }),
}

module.exports = TestCommand
