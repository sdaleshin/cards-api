import { Injectable } from '@nestjs/common'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
})
const openai = new OpenAIApi(configuration)

@Injectable()
export class JobAnalyzerService {
    async analyze(jobDescription: string) {
        console.log('jobDescription', jobDescription)
        const var2 = `Прочитай описание вакансии и ответь максимально коротко предлагают ли они visa sponsorship и какая зарплата ${jobDescription} `

        const chatCompletion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: var2 }],
            max_tokens: 250,
            top_p: 0.2,
            temperature: 0.2,
        })

        return chatCompletion.data
    }
}
