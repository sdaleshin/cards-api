import { Definition } from './wordnet.type'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const wordnet = require('wordnet')

export const initWordnet = (databaseDir?: string): Promise<undefined> => {
    return wordnet.init()
}

export const lookupWord = (
    word: string,
    skipPointers?: boolean,
): Promise<Definition[]> => {
    return wordnet.lookup(word, skipPointers)
}
