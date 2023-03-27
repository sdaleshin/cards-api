import { Definition } from './wordnet.type'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const wndbWithExceptions = require('wndb-with-exceptions')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WordNet = require('node-wordnet')

let nodeWordnet = null
export const initWordnet = (): Promise<any> => {
    nodeWordnet = new WordNet({ dataDir: wndbWithExceptions.path, cache: true })
    return nodeWordnet.open()
}

export const lookupWord = async (word: string): Promise<Definition[]> => {
    const correctedForms = await nodeWordnet.validForms(word)
    const result = []
    for (const item of correctedForms) {
        result.push(await nodeWordnet.lookup(item))
    }
    return result.flat()
}
