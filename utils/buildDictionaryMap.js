'use strict'
const fs = require('fs')

/**
 * getDictionaryMap builds a map from a word list where keys are the letters of the alphabet
 * @params dictionary: string - path to word list which represents our dictionary
 * @returns dictionaryMap: Map - Map of all words in our dictionary with keys as letters of alphabet
 *                      values as list of all letters beginning with that 'key'
 */
module.exports = {
    getDictionaryMap: (dictionary) => {
        let dictionaryMap = new Map()
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        const data = fs.readFileSync(dictionary, 'utf8').split('\r\n')
        let letterList = []
        for (let index = 0; index <= letters.length;) {
            data.map(word => {
                if (word.charAt(0) === letters[index]) {
                    letterList.push(word)
                } else {
                    letterList.length > 0 && dictionaryMap.set(letters[index], letterList)
                    letterList = []
                    index += 1
                }
            })
        }
        return dictionaryMap
    }
}