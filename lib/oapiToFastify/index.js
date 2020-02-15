'use strict'

const oapiToModules = require('../oapiToModules')
const oapiToPlugins = require('../oapiToPlugins')
const oapiToSrc = require('../oapiToSrc')
const oapiToRoot = require('../oapiToRoot')
const oapiToTests = require('../oapiToTests')

const { flatten } = require('../../lib/common')

const oapiToFastify = openApi => [
  ...flatten(oapiToModules(openApi)),
  ...oapiToPlugins(openApi),
  ...oapiToSrc(openApi),
  ...oapiToRoot(openApi),
  ...oapiToTests(openApi)

]

module.exports = openApi => oapiToFastify(openApi)
