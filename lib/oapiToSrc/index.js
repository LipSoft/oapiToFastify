'use strict'

const { loadTemplate } = require('../../lib/common')

const oapiToSrc = openApi => [
  {
    content: {},
    template: loadTemplate('../../build/template/src/index.ts.mustache'),
    path: 'src/index.ts'
  },
  {
    content: {
      Modules: Object.keys(openApi.components.schemas)
        .filter(schema => schema !== 'Error')
        .map(schema => ({ name: schema }))
    },
    template: loadTemplate('../../build/template/src/server.ts.mustache'),
    path: 'src/server.ts'
  }
]

module.exports = openApi => oapiToSrc(openApi)
