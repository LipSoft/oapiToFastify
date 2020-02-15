'use strict'

const { loadTemplate } = require('../common')

const oapiToRoot = openApi => [
  {
    content: {},
    template: loadTemplate('../../build/template/package.json.mustache'),
    path: 'package.json'
  },
  {
    content: {},
    template: loadTemplate('../../build/template/tsconfig.json.mustache'),
    path: 'tsconfig.json'
  },
  {
    content: {},
    template: loadTemplate('../../build/template/.env.mustache'),
    path: '.env'
  },
  {
    content: {},
    template: loadTemplate('../../build/template/jest.config.js.mustache'),
    path: 'jest.config.js'
  },
  {
    content: {},
    template: loadTemplate('../../build/template/.gitignore.mustache'),
    path: '.gitignore'
  }

]

module.exports = openApi => oapiToRoot(openApi)
