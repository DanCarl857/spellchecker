'use strict'

const fs = require('fs')
const chalk = require('chalk')
const { getDictionaryMap } = require('./buildDictionaryMap')

function sanitize(word) {
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
    return word.replace(regex, '')
}

module.exports = {
    // Remove punctuation from words
    sanitize: sanitize,

    checkIfValidWord: (word) => {
        return (/[a-zA-Z]/).test(word)
    },

    fileExists: (filePath) => {
        return fs.existsSync(filePath)
    },

    isWordCorrect: (word) => {
        word = sanitize(word)
        let wordMap = getDictionaryMap('./resources/us_wo.csv')
        let potentialList = wordMap.get(word.toString().slice(0, 1).toUpperCase())
        return potentialList && potentialList.find(correctWord => word.toUpperCase() === correctWord.toUpperCase()) ? true : false
    },

    writeToTerminal: (word, paragraph, line, offset) => {
        console.log(`Wrongly Spelled word: ${chalk.red.underline.bold(word)}\nLine: ${chalk.yellow(line)}, Paragraph: ${chalk.yellow(paragraph)}, Offset: ${chalk.yellow(offset + 1)}\n\n`)
    },

    clearFile: () => {
        fs.truncate('spellchecker_output.txt', 0, () => {})
    },

    // Noticed some weirdness with apostrophes ;-)
    exceptions: () => {
        return ["I'M", "I'D", "IT'S", "I'VE", "HE'S", "I'LL", "HE'D", "WE'D", "IT'D", "DON'T", "CAN'T", "WE'RE", "ISN'T", "WON'T", "WE'VE", "WE'LL", "SHE'S", "YOU'D", "LET'S", "WHO'S", "HE'LL", "IT'LL", "SHE'D", "AIN'T", "WHO'D", "THAT'S", "DIDN'T", "YOU'RE", "YOU'LL", "WHAT'S", "WASN'T", "YOU'VE", "AREN'T", "HERE'S", "HASN'T", "HADN'T", "THEY'D", "HERE'S", "WHO'VE", "SHE'LL", "WHO'LL", "THAT'D", "DOESN'T", "THERE'S", "THEY'RE", "WORLD'S", "HAVEN'T", "THEY'VE", "WEREN'T", "THEY'LL", "O'CLOCK", "MUSTN'T", "NEEDN'T", "MUST'VE", "THAT'LL", "COULDN'T", "WOULDN'T", "COULD'VE", "WOULD'VE", "THERE'LL", "SHOULDN'T", "SHOULD'VE", "I’M", "I’D", "IT’S", "I’VE", "HE’S", "I’LL", "HE’D", "WE’D", "IT’D", "DON’T", "CAN’T", "WE’RE", "ISN’T", "WON’T", "WE’VE", "WE’LL", "SHE’S", "YOU’D", "LET’S", "WHO’S", "HE’LL", "IT’LL", "SHE’D", "AIN’T", "WHO’D", "THAT’S", "DIDN’T", "YOU’RE", "YOU’LL", "WHAT’S", "WASN’T", "YOU’VE", "AREN’T", "HERE’S", "HASN’T", "HADN’T", "THEY’D", "HERE’S", "WHO’VE", "SHE’LL", "WHO’LL", "THAT’D", "DOESN’T", "THERE’S", "THEY’RE", "WORLD’S", "HAVEN’T", "THEY’VE", "WEREN’T", "THEY’LL", "O’CLOCK", "MUSTN’T", "NEEDN’T", "MUST’VE", "THAT’LL", "COULDN’T", "WOULDN’T", "COULD’VE", "WOULD’VE", "THERE’LL", "SHOULDN’T", "SHOULD’VE"]
    }
}