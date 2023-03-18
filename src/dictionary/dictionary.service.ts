import { Injectable } from '@nestjs/common'
import { lookupWord } from './wordnet'

@Injectable()
export class DictionaryService {
    search(word: string) {
        return lookupWord(word)
    }
}
