'use strict'

const { loadTemplate } = require('../../lib/common')

const oapiToPlugins = openApi => [
  {
    content: {},
    template: loadTemplate('../../build/template/src/plugins/auth.ts.mustache'),
    path: 'src/plugins/auth.ts'
  },
  {
    content: {
      Modules: Object.keys(openApi.components.schemas)
        .filter(schema => schema !== 'Error')
        .map(schema => ({ name: schema }))
    },
    template: loadTemplate('../../build/template/src/plugins/db.ts.mustache'),
    path: 'src/plugins/db.ts'
  }
]

module.exports = openApi => oapiToPlugins(openApi)
