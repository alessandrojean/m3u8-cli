const {Command} = require('@oclif/command')
const inquirer = require('inquirer')
const {Channel} = require('../models')
const {populateQuestions} = require('../questions')

class UpdateCommand extends Command {
  async run() {
    const {args} = this.parse(UpdateCommand)
    const {id} = args

    if (isNaN(parseInt(id, 10))) {
      this.error('The id provided is not valid.')
      return
    }

    const channel = await Channel.findOne({where: {id}})
    if (!channel) {
      this.error(`A channel with id ${id} does not exists`)
      return
    }

    const questions = populateQuestions(channel)
    const answers = await inquirer.prompt(questions)

    await Channel.update(answers, {where: {id}})
    this.log(`Channel ${answers.name} updated.`)
  }
}

UpdateCommand.description = 'Update an existing channel in the database'

UpdateCommand.args = [
  {name: 'id', required: true, description: 'id of the channel'},
]

module.exports = UpdateCommand
