'use strict'

const { common, oapiToFastify } = require('../lib')

const { render, saveFile } = common

const path = require('path')

const opneApi = require('../build/imported/fromMysql.json')

oapiToFastify(opneApi).forEach(file => saveFile(path.join('../../dist/', file.path), render(file.template, file.content)))
