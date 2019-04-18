const {Command} = require('@oclif/command')
const inquirer = require('inquirer')
const {Channel} = require('../models')
const {questions} = require('../questions')

class CreateCommand extends Command {
  async run() {
    const answers = await inquirer.prompt(questions)
    const channel = await Channel.create(answers)
    this.log(`Channel ${channel.name} created with id ${channel.id}.`)
  }
}

CreateCommand.description = 'Creates a new channel in the database'

module.exports = CreateCommand
