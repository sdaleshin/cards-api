import { Injectable } from '@nestjs/common'
import { DictionaryService } from '../dictionary/dictionary.service'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
})

@Injectable()
export class TranslationService {
    constructor(private dictionaryService: DictionaryService) {}

    async translate(word: string, context: string) {
        const var1 = `Explain dictionary meaning of word "${word}", which was used in next context "${context}" in one sentence".`

        const var2 = `Offer a clear and concise definition of exactly word "${word}" using simple language. This word used in sentence "${context}"`

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: var2 }],
            max_tokens: 50,
            top_p: 0.2,
            temperature: 0.2,
        })

        return chatCompletion
        //
        // const response = await openai.createCompletion({
        //     model: 'gpt-3.5-turbo',
        //     prompt: var2,
        //     temperature: 1,
        //     max_tokens: 50,
        //     top_p: 1,
        //     frequency_penalty: 0,
        //     presence_penalty: 0,
        // })
        // return response.data
    }
    async translateForDictionary(word: string) {
        const request = `print all explanations of "${word}"`
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: request }],
            max_tokens: 256,
            top_p: 0.2,
            temperature: 0,
        })

        const normalizedWord = await this.dictionaryService.normalizeWord(word)

        return {
            word: normalizedWord ?? word.toLowerCase(),
            data: chatCompletion,
        }
    }
}
