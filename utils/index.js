'use strict'

const fs = require('fs')

module.exports = {
    // Remove punctuation from words
    sanitize: (word) => {
        const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
        return word.replace(regex, '') 
    },

    checkIfValidWord: (word) => {
        return (/[a-zA-Z]/).test(word)
    },

    fileExists: (filePath) => {
        return fs.existsSync(filePath)
    }
}