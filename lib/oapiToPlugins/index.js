'use strict'

const { loadTemplate } = require('../../lib/common')

const oapiToPlugins = openApi => [
  {
    content: {},
    template: loadTemplate('../../build/template/src/plugins/auth.ts.mustache'),
    path: 'src/plugins/auth.ts'
  },
  {
    content: {},
    template: loadTemplate('../../build/template/src/plugins/db.ts.mustache'),
    path: 'src/plugins/db.ts'
  }
]

module.exports = openApi => oapiToPlugins(openApi)
