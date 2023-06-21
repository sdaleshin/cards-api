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
        const word = item.split('#')[0].toLowerCase().split('_').join(' ')
        const definitions = await nodeWordnet.lookup(item)
        result.push(definitions.map((d) => ({ ...d, word })))
    }
    return result.flat()
}

export const normalizeWord = async (word: string): Promise<string> => {
    const correctedForms = await nodeWordnet.validForms(word)
    return correctedForms?.[0]?.split('#')[0].toLowerCase().split('_').join(' ')
}
