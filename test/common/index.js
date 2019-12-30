'use strict'
/* eslint-env mocha */
const {
  loadYamlFile,
  loadTemplate,
  render,
  saveFile,
  fileExists,
  capitalize,
  flatten
} = require('../../lib/common')

const rimraf = require('rimraf')
const path = require('path')
const assert = require('assert')
const chai = require('chai')
const sinon = require('sinon')

sinon.assert.expose(chai.assert, { prefix: '' })
rimraf.sync(path.normalize(path.join(__dirname, '../../test/build/common/dist')))

describe('#common()', function () {
  describe('#loadYamlFile()', function () {
    it('should return js Object ', () => assert.deepStrictEqual(loadYamlFile('../../test/build/common/loadYamlFile.yaml'), require('../../test/build/common/loadYamlFile.json')))
    it('should return js Object ', () => assert.deepStrictEqual(loadYamlFile('..\\..\\test\\build\\common\\loadYamlFile.yaml'), require('../../test/build/common/loadYamlFile.json')))
  })

  describe('#loadTemplate()', function () {
    it('should return Template ', () => assert.deepStrictEqual(loadTemplate('../../test/build/common/template.mustache'), 'oapiToFastify is {{{word}}}'))
    it('should return Template ', () => assert.deepStrictEqual(loadTemplate('..\\..\\test\\build\\common\\template.mustache'), 'oapiToFastify is {{{word}}}'))
  })

  describe('#render()', function () {
    it('should return render template ', () => assert.deepStrictEqual(render(loadTemplate('../../test/build/common/template.mustache'), { word: 'Awesome' }), 'oapiToFastify is Awesome'))
    it('should return render template ', () => assert.deepStrictEqual(render(loadTemplate('..\\..\\test\\build\\common\\template.mustache'), { word: 'Awesome' }), 'oapiToFastify is Awesome'))
  })

  describe('#saveFile()', function () {
    it('should save file ', () => assert.strictEqual(saveFile('../../test/build/common/dist/test.txt', 'oapiToFastify is awesome'), undefined))
    it('file should exist ', () => assert.strictEqual(fileExists('../../test/build/common/dist/test.txt'), true))
  })

  describe('#capitalize()', function () {
    it('should return \'\' ', () => assert.strictEqual(capitalize(''), ''))
    it('should return Amazing ', () => assert.strictEqual(capitalize('amazing'), 'Amazing'))
  })

  describe('#flatten()', function () {
    it('should return [1,2,3] ', () => assert.deepStrictEqual(flatten([1, [2, [3]]]), [1, 2, 3]))
  })
})
