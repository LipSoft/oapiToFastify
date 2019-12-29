'use strict'

const oapiToModules = require('../oapiToModules')
const oapiToPlugins = require('../oapiToPlugins')
const oapiToSrc = require('../oapiToSrc')
const oapiToTests = require('../oapiToTests')

const { flatten } = require('../../lib/common')

const oapiToFastify = openApi => [
  ...flatten(oapiToModules(openApi)),
  ...oapiToPlugins(openApi),
  ...oapiToSrc(openApi),
  ...oapiToTests(openApi)

]

module.exports = openApi => oapiToFastify(openApi)
