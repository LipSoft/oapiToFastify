'use strict'
/* eslint-env mocha */
const oapiToModules = require('../../lib/oapiToModules')

const assert = require('assert')
const chai = require('chai')
const sinon = require('sinon')

const openApi = require('../../test/build/oapiToModules/openapi.json')

sinon.assert.expose(chai.assert, { prefix: '' })

describe('#oapiToModules()', function () {
  describe('#oapiToModules()', function () {
    const modules = oapiToModules(openApi)
    // it('should be equal', () => assert.deepStrictEqual(modules[0], [
    //   {
    //     content: {},
    //     path: 'src/modules/Error/entity.ts',
    //     template: 'entity'
    //   },
    //   {
    //     content: {},
    //     path: 'src/modules/Error/routes.ts',
    //     template: 'routes'
    //   },
    //   {
    //     content: {},
    //     path: 'src/modules/Error/schema.ts',
    //     template: 'schema'
    //   }
    // ]))
  })
})
