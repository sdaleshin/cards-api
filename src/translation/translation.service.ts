import { Injectable } from '@nestjs/common'
import { Configuration, OpenAIApi } from 'openai'
import { DictionaryService } from '../dictionary/dictionary.service'

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
})
const openai = new OpenAIApi(configuration)

@Injectable()
export class TranslationService {
    constructor(private dictionaryService: DictionaryService) {}

    async translate(word: string, context: string) {
        const var1 = `Explain dictionary meaning of word "${word}", which was used in next context "${context}" in one sentence".`

        const var2 = `Offer a clear and concise definition of exactly word "${word}" using simple language. This word used in sentence "${context}"`

        const chatCompletion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: var2 }],
            max_tokens: 50,
            top_p: 0.2,
            temperature: 0.2,
        })

        return chatCompletion.data
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
        const chatCompletion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: request }],
            max_tokens: 256,
            top_p: 0.2,
            temperature: 0,
        })

        const normilizedWord = await this.dictionaryService.normalizeWord(word)

        return {
            word: normilizedWord,
            data: chatCompletion.data,
        }
    }
}
