'use strict'

const { loadTemplate, basicTypes } = require('../../lib/common')

const entityContent = obj => {
  const { schema, schemaValue } = obj
  console.log(schemaValue['x-ls'])
  return {
    schema,
    fields: Object.entries(schemaValue.properties)
      .map(([prop, propValue]) => ({ name: prop, type: basicTypes(propValue.type) })),
    belongsTo: Object.entries(schemaValue['x-ls'].belongsTo).map(([rel, relValue]) => relValue),
    hasMany: Object.entries(schemaValue['x-ls'].hasMany).map(([rel, relValue]) => relValue),
    imports: []
  }
}

const routeContent = obj => {
  const { schema } = obj
  return { schema }
}

const schemaContent = obj => {
  const { schema, schemaValue } = obj
  return {
    entity: JSON.stringify(schemaValue.properties, null, 2),
    schema,
    schemaValue: JSON.stringify(schemaValue, null, 2)
  }
}

const oapiToModules = openApi => Object.entries(openApi.components.schemas)
  .filter(([schema, schemaValue]) => schema !== 'Error')
  .map(([schema, schemaValue]) => [
    {
      content: entityContent({ schema, schemaValue }),
      template: loadTemplate('../../build/template/src/modules/entity.ts.mustache'),
      path: `src/modules/${schema}/entity.ts`
    },
    {
      content: routeContent({ schema, schemaValue }),
      template: loadTemplate('../../build/template/src/modules/routes.ts.mustache'),
      path: `src/modules/${schema}/routes.ts`
    },
    {
      content: schemaContent({ schema, schemaValue }),
      template: loadTemplate('../../build/template/src/modules/schema.ts.mustache'),
      path: `src/modules/${schema}/schema.ts`
    }]
  )

module.exports = openApi => oapiToModules(openApi)
