import { Injectable } from '@nestjs/common'
import { Question } from './types/Question'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
})

@Injectable()
export class JobAnalyzerService {
    async analyze(jobDescription: string, questions: Question[]) {
        const test = `Read the job description, and then answer the following questions. Response should be a valid json without any additional symbols. For boolean type questions, the answer should be yes/no/unknown. For questions with type text - simply provide a brief textual answer.
Provide the answer in the form of JSON like [{id: "47ace7b4-a628-466a-bb10-a7b9decde4e6", answer: "yes"}, {id: "47ace7b4-a628-466a-bb10-a7b9decde123", answer: "Some answer"}] where id should be id of question and answer should be answer for question with this id.  
Job Description: ${jobDescription}
Questions: ${JSON.stringify(questions)}`

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: test }],
            response_format: { type: 'json_object' },
            max_tokens: questions.length * 300,
            top_p: 0.2,
            temperature: 0.2,
        })

        return chatCompletion
    }
}
