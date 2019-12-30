'use strict'

const yaml = require('yaml')
const fs = require('fs')
const path = require('path')
const mustache = require('mustache')
const mkdirp = require('mkdirp')

module.exports = {
  loadYamlFile: filePath => yaml.parse(fs.readFileSync(path.normalize(path.join(__dirname, filePath)), 'utf8')),
  loadTemplate: filePath => fs.readFileSync(path.normalize(path.join(__dirname, filePath)), 'utf8'),
  render: (template, view) => mustache.render(template, view),
  saveFile: (filePath, content) => (fs.existsSync(path.normalize(path.dirname(path.join(__dirname, filePath)))) || mkdirp.sync(path.normalize(path.dirname(path.join(__dirname, filePath))))) && fs.writeFileSync(path.normalize(path.join(__dirname, filePath)), content),
  fileExists: filePath => fs.existsSync(path.normalize(path.join(__dirname, filePath))),
  capitalize: text => (text && text.length > 0 && text.charAt(0).toUpperCase() + text.slice(1)) || text,
  flatten: arr => arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? module.exports.flatten(toFlatten) : toFlatten), [])
}
