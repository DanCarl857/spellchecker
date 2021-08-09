#!/usr/bin/env node
'use strict'

const fs = require('fs')
const readline = require('readline')

// 3rd party libraries
const chalk = require('chalk')
const boxen = require('boxen')
const yargs = require('yargs')
const figlet = require('figlet')

// Custom imports
const utils = require('./utils')
const { sanitize } = require('./utils')

// Variables
const NO_SPACE = 'ns'
const SPACE = 's'

console.log(
    chalk.blue(
        figlet.textSync('Spellchecker', { horizontalLayout: 'full' })
    )
)
console.log(`\nDescription: A simple tool to spellcheck a provided file...\nAuthor: Daniel Carlson\nVersion: 1.0.0\nLicense: MIT\n\n`)

const options = yargs
    .usage("\n\nUsage: -f <path_to_file> -o <path_to-output_file>")
    .option('f', { alias: 'file', describe: 'Your file to be processed', type: 'string', demandOption: true})
    .argv

const spellCheck = async (filePath) => {
    utils.clearOutputFile()
    const fileStream = fs.createReadStream(filePath)
    const currentLine = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    let checkedWrongWords = new Set()
    let previousLine = ''
    let paragraphCount = 0
    const lineCounter = ((index = 0) => () => ++index)()
    const EXCEPTIONS_LIST = utils.exceptions()

    await currentLine.on("line", (line, lineNumber = lineCounter()) => {
        let wrongWords = []
        // Get paragraph count
        if (/^\s*$/.test(line)) {
           previousLine = SPACE 
        } else {
            if (!previousLine || previousLine === SPACE) {
                paragraphCount += 1
                previousLine = NO_SPACE
            }
        }

        if (line) {
            let words = line.split(' ')
            words.map(word => {
                // If word was wrong before, it's always wrong so no need checking it again
                if (checkedWrongWords.has(sanitize(word))) {
                    utils.writeToTerminal(utils.sanitize(word), paragraphCount, lineNumber, words.join(' ').indexOf(word))
                } else if(!utils.isWordCorrect(word)) {
                    if (utils.checkIfValidWord(word)) {
                        if (!EXCEPTIONS_LIST.includes(word.toUpperCase())) {
                            wrongWords.push(utils.sanitize(word))
                            checkedWrongWords.add(sanitize(word))
                            utils.writeToTerminal(utils.sanitize(word), paragraphCount, lineNumber, words.join(' ').indexOf(word))
                        }
                    }
                }
            })
        }
        let content = ''
        if (!line) {
            content = '\n\n'
        } else {
            content = (wrongWords.length > 0) ? `[${line}]` : line
        }
        fs.writeFile('spellchecker_output.txt', content, { flag: 'a+' }, err => {})
    })
}

const filePath = `${options.file}`
if (utils.fileExists(filePath)) {
    spellCheck(filePath)
} else {
    console.log(boxen(`You need to provide an existing file for us to spell check\nPlease check to ensure the path you provided is valid`, {padding: 1}))
}