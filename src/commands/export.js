const {Command} = require('@oclif/command')
const {promisify} = require('util')
const {writeFile, mkdir} = require('fs')
const path = require('path')
const {Channel} = require('../models')
const {baseUrl, defaultPath} = require('../config/exporter')
const {countries} = require('countries-list')
const ejs = require('ejs')

const writeFilePromise = promisify(writeFile)
const mkdirPromise = promisify(mkdir)

const getCountryCode = country =>
  Object.keys(countries).find(key => countries[key].name === country)

const fillCountryChannels = async ({country}) => {
  const channels = await Channel.findAll({
    order: [['country', 'ASC'], ['name', 'ASC']],
    where: {country},
  })

  const countryCode = getCountryCode(country)

  return {
    name: country,
    code: countryCode,
    channels,
  }
}

const getData = async () => {
  const channels = await Channel.findAll({
    order: [['continent', 'ASC'], ['country', 'ASC'], ['name', 'ASC']],
  })

  const countries = await Channel.findAll({
    attributes: ['country', 'continent'],
    group: ['country'],
    order: [['country', 'ASC']],
  })
  const countryPromises = countries.map(c => fillCountryChannels(c))

  const groupedChannels = await Promise.all(countryPromises)

  return {channels, groupedChannels}
}

const createCompleteM3u8 = async channels => {
  const template = path.join(__dirname, '../templates/list.ejs')
  const output = path.join(defaultPath, 'list.m3u8')
  const renderedStr = await ejs.renderFile(template, {channels}, {async: true})
  await writeFilePromise(output, renderedStr)
}

const createGroupedM3u8 = async groupedChannels => {
  const masterTemplate = path.join(__dirname, '../templates/grouped.ejs')
  const template = path.join(__dirname, '../templates/list.ejs')

  // Create the master playlist.
  const masterOutput = path.join(defaultPath, 'grouped.m3u8')
  const renderedStr = await ejs.renderFile(
    masterTemplate,
    {countries: groupedChannels, baseUrl},
    {async: true}
  )
  await writeFilePromise(masterOutput, renderedStr)
  // Create the output folder.
  await mkdirPromise(path.join(defaultPath, 'countries'))
  // Create the individual playlists.
  for (const country of groupedChannels) {
    const output = path.join(defaultPath, 'countries', `${country.code}.m3u8`)
    /* eslint-disable no-await-in-loop */
    const list = await ejs.renderFile(template, {channels: country.channels}, {async: true})
    await writeFilePromise(output, list)
  }
}

class ExportCommand extends Command {
  async run() {
    try {
      const {channels, groupedChannels} = await getData()
      await createCompleteM3u8(channels)
      await createGroupedM3u8(groupedChannels)
    } catch (error) {
      this.error(error)
    }

    this.log('Exported list with success.')
  }
}

ExportCommand.description = 'Export the database channels to a M3U8 file.'

module.exports = ExportCommand
