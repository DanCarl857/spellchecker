#!/usr/bin/env node
'use strict'

const clear = require('clear')
const chalk = require('chalk')
const yargs = require('yargs')
const figlet = require('figlet')
const fs = require('fs')
const readline = require('readline')

// Custom imports
const buildDictionaryMap = require('./utils/buildDictionaryMap')
const utils = require('./utils')

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

async const spellCheck = (filePath) => {
    const fileStream = fs.createReadStream(filePath)
    const currentLine = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })
    
    let wrongWords = []
    const lineCounter = ((index = 0) => () => ++index)()
    await currentLine.on("line", (line, lineNumber = lineCounter()) => {
       let words = line.split(' ')
        words.map(word => {
            if(!isWordCorrect(word)) {
                if (utils.checkIfValidWord(word)) {
                    wrongWords.push(utils.sanitize(word))
                    console.log(`Wrongly Spelled word: ${utils.sanitize(word)}\nLine: ${lineNumber}, Paragraph: 1, Offset: ${words.join(' ').indexOf(word)}\n\n`)
                }
            }
        })
        // console.log(wrongWords)
    })
}

const isWordCorrect = (word) => {
    word = utils.sanitize(word)
    let wordMap = buildDictionaryMap.getDictionaryMap('./resources/us_wo.csv')
    let potentialList = wordMap.get(word.toString().slice(0, 1).toUpperCase())
    return potentialList && potentialList.find(correctWord => word.toUpperCase() === correctWord.toUpperCase()) ? true : false
}

const filePath = `${options.file}`
if (utils.fileExists(filePath)) {
    spellCheck(filePath)
} else {
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log('You need to provide a file for us to spell check')
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++')
}