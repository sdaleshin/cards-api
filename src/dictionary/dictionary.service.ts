import { Injectable } from '@nestjs/common'
import { lookupWord, normalizeWord } from './wordnet'

@Injectable()
export class DictionaryService {
    search(word: string) {
        return lookupWord(word)
    }
    normalizeWord(word: string) {
        return normalizeWord(word)
    }
}
