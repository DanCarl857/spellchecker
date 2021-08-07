#!/usr/bin/env node
'use strict'

const clear = require('clear')
const chalk = require('chalk')
const yargs = require('yargs')
const figlet = require('figlet')

// Custom imports
const files = require('./utils/files')

clear()
console.log(
    chalk.blue(
        figlet.textSync('Spellchecker', { horizontalLayout: 'full' })
    )
)

const options = yargs
    .usage("\n\nUsage: -f <path_to_file>")
    .option('f', { alias: 'file', describe: 'Your file to be processed', type: 'string', demandOption: true})
    .argv

const filePath = `${options.file}`
console.log(filePath)