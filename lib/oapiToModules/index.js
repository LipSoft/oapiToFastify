'use strict'

const { loadTemplate, basicTypes, flatten } = require('../../lib/common')

const entityContent = obj => {
  const { schema, schemaValue } = obj
  // console.log(schemaValue['x-ls'])
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

const injectID = () => ({ id: { type: 'integer', 'x-ls': { desc: 'ID' } } })
const injectNavProps = obj => {
  const { schemaValue, schemas } = obj
  return {
    ...Object.entries(schemaValue['x-ls'].belongsTo).reduce((acu, [rel, relValue]) => ({
      ...acu,
      [relValue.referencedTableName]: {
        type: 'object',
        properties: removeFK(schemas[relValue.tableName])
      }
    }), {}),
    ...Object.entries(schemaValue['x-ls'].hasMany).reduce((acu, [rel, relValue]) => ({
      ...acu,
      [relValue.tableName]: {
        type: 'array',
        items: {
          properties: removeFK(schemas[relValue.referencedTableName])
        }
      }
    }), {})
  }
}
const removeFK = schema => {
  // return schema.properties
  const fk = [
    ...Object.entries(schema['x-ls'].belongsTo).map(([_, sc]) => sc.columnName),
    ...Object.entries(schema['x-ls'].hasMany).map(([_, sc]) => sc.columnName)
  ]
  fk.forEach(_fk => { delete schema.properties[_fk] })
  return { ...injectID(), ...schema.properties }
}

const schemaContent = obj => {
  const { schema, schemaValue } = obj
  return {
    entity: JSON.stringify({
      ...injectID(),
      ...removeFK(schemaValue),
      ...injectNavProps(obj)
    }, null, 2),
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
      content: schemaContent({ schema, schemaValue, schemas: openApi.components.schemas }),
      template: loadTemplate('../../build/template/src/modules/schema.ts.mustache'),
      path: `src/modules/${schema}/schema.ts`
    }]
  )

module.exports = openApi => oapiToModules(openApi)
