'use strict'

const { loadTemplate } = require('../../lib/common')

const oapiToModules = openApi => Object.entries(openApi.components.schemas).map(([schema, schemaValue]) => [
  {
    content: { schema },
    template: loadTemplate('../../build/template/src/modules/entity.ts.mustache'),
    path: `src/modules/${schema}/entity.ts`
  },
  {
    content: { schema },
    template: loadTemplate('../../build/template/src/modules/routes.ts.mustache'),
    path: `src/modules/${schema}/routes.ts`
  },
  {
    content: {schema, schemaValue: JSON.stringify(schemaValue, null, 2) },
    template: loadTemplate('../../build/template/src/modules/schema.ts.mustache'),
    path: `src/modules/${schema}/schema.ts`
  }]
)

module.exports = openApi => oapiToModules(openApi)
