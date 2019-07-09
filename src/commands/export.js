const {Command, flags} = require('@oclif/command')
const {promisify} = require('util')
const {writeFile} = require('fs')
const path = require('path')
const {Channel} = require('../models')
const {defaultOutput, defaultPath} = require('../config/exporter')
const {countries} = require('countries-list')

const writeFilePromise = promisify(writeFile)

const getCountryCode = country => Object
  .keys(countries)
  .filter(key => countries[key].name === country)

const createM3U8 = channels => {
  let fileContent = '#EXTM3U\n'
  for (let tv of channels) {
    const tvgName = tv.tvgName ? `tvg-name="${tv.tvgName}" ` : ''
    const aspectRatio = tv.aspectRatio ?
      `aspect-ratio="${tv.aspectRatio}" ` :
      ''

    fileContent += `\n#EXTINF:-1 ${tvgName}tvg-logo="${
      tv.tvgLogo
    }" ${aspectRatio}type="stream", ${tv.name}`
    fileContent += `\n#EXTBG: ${tv.color}`
    fileContent += `\n${tv.streamUrl}\n`
  }
  return fileContent
}

const createMasterM3U8 = dbCountries => {
  let fileContent = '#EXTM3U\n'
  for (let country of dbCountries) {
    const countryCode = getCountryCode(country.country)
    const flag = `https://www.countryflags.io/${countryCode}/flat/64.png`

    fileContent += `\n#EXTINF:0 type="playlist" tvg-logo="${flag}", ${country.country}`
    fileContent += `\n${countryCode}.m3u8\n`
  }
  return fileContent
}

const createJson = channels => {
  const parsed = channels.map(channel => ({
    name: channel.name,
    aspectRatio: channel.aspectRatio,
    color: channel.color,
    continent: channel.continent,
    country: channel.country,
    logo: channel.tvgLogo,
    url: channel.streamUrl,
  }))

  return JSON.stringify(parsed, null, 2)
}

class ExportCommand extends Command {
  async run() {
    const {flags} = this.parse(ExportCommand)
    const output = defaultOutput + (flags.json ? '.json' : '.m3u8')

    if (flags.json) {
      const channels = await Channel.findAll({
        order: [['continent', 'ASC'], ['country', 'ASC'], ['name', 'ASC']],
      })

      await writeFilePromise(createJson(channels))

      this.log(`Exported list with success in ${output}`)
      return
    }

    const dbCountries = await Channel.findAll({
      attributes: ['country', 'continent'],
      group: ['country'],
      order: [['country', 'ASC']],
    })

    for (let country of dbCountries) {
      /* eslint-disable no-await-in-loop */
      const countryChannels = await Channel.findAll({
        order: [['country', 'ASC'], ['name', 'ASC']],
        where: {
          country: country.country,
        },
      })

      const countryCode = getCountryCode(country.country)

      const fileContent = createM3U8(countryChannels)
      const fileName = path.join(defaultPath, 'countries', countryCode[0] + '.m3u8')

      await writeFilePromise(fileName, fileContent)
    }

    const fileContent = createMasterM3U8(dbCountries)

    await writeFilePromise(output, fileContent)
    this.log(`Exported list with success in ${output}`)
  }
}

ExportCommand.description = 'Export the database channels to a M3U8 file.'

ExportCommand.flags = {
  json: flags.boolean({char: 'j', description: 'exports in json format'}),
}

module.exports = ExportCommand
