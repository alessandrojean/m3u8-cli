const {continents, countries} = require('countries-list')

const continentsNames = Object
  .keys(continents)
  .map(key => continents[key])

const continentsInfo = Object.keys(continents)
  .map(key => {
    return {key, name: continents[key]}
  })

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name',
  }, {
    type: 'input',
    name: 'streamUrl',
    message: 'Stream URL',
  }, {
    type: 'input',
    name: 'tvgLogo',
    message: 'Logo URL',
  }, {
    type: 'input',
    name: 'color',
    message: 'Background color',
    validate: value => value.match(/^#([0-9a-fA-F]+)$/) ? true : 'Not a valid color',
  }, {
    type: 'input',
    name: 'tvgName',
    message: 'SS-IPTV name',
    default: '',
    filter: value => value === '' ? undefined : value,
  }, {
    type: 'input',
    name: 'aspectRatio',
    message: 'Aspect-ratio',
    default: '16:9',
    validate: value => value.match(/^(16:9|4:3)$/) ? true : 'Not a valid aspect',
  }, {
    type: 'list',
    name: 'continent',
    message: 'Continent',
    choices: continentsNames,
  }, {
    type: 'list',
    name: 'country',
    message: 'Country',
    choices: answers => {
      const {continent} = answers
      const continentCode = continentsInfo
        .filter(({name}) => name === continent)
        .map(info => info.key)[0]

      return Object
        .keys(countries)
        .map(key => countries[key])
        .filter(country => country.continent === continentCode)
        .map(country => country.name)
    },
  },
]

const populateQuestions = answers => {
  return questions
    .filter(({name}) => name !== 'continent' && name !== 'country')
    .map(question => {
      const value = answers[question.name] ? answers[question.name] : ''
      return {...question, default: value}
    })
}

module.exports = {
  questions,
  populateQuestions,
}
