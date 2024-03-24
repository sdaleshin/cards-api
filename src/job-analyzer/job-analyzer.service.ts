import { Injectable } from '@nestjs/common'
import { Question } from './types/Question'
import OpenAI from 'openai'

import {
    VertexAI,
    HarmCategory,
    HarmBlockThreshold,
} from '@google-cloud/vertexai'

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
})

const project = 'charismatic-fx-416615'
const location = 'us-central1'
// For the latest list of available Gemini models in Vertex, please refer to https://cloud.google.com/vertex-ai/docs/generative-ai/learn/models#gemini-models
const textModel = 'gemini-1.0-pro'

const vertex_ai = new VertexAI({ project: project, location: location })

// Instantiate models
const generativeModel = vertex_ai.getGenerativeModel({
    model: textModel,
    // The following parameters are optional
    // They can also be passed to individual content generation requests
    safety_settings: [
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ],
    generation_config: { max_output_tokens: 256 },
})

@Injectable()
export class JobAnalyzerService {
    async analyze(jobDescription: string, questions: Question[]) {
        const test = `Read the job description, and then answer the following questions. Response should be a valid json without any additional symbols. For boolean type questions, the answer should be yes/no/unknown. For questions with type text - simply provide a brief textual answer.
Provide the answer in the form of JSON like [{id: "47ace7b4-a628-466a-bb10-a7b9decde4e6", answer: "yes"}, {id: "47ace7b4-a628-466a-bb10-a7b9decde123", answer: "Some answer"}] where id should be id of question and answer should be answer for question with this id.  
Job Description: ${jobDescription}
Questions: ${JSON.stringify(questions)}`

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: test }],
            max_tokens: questions.length * 150,
            top_p: 0.2,
            temperature: 0.2,
        })

        return chatCompletion
    }

    async analyzeGemini(jobDescription: string, questions: Question[]) {
        const test = `Read the job description, and then answer the following questions. Response should be a valid json without any additional symbols. For boolean type questions, the answer should be yes/no/unknown. For questions with type text - simply provide a brief textual answer.
Provide the answer in the form of JSON like [{id: "47ace7b4-a628-466a-bb10-a7b9decde4e6", answer: "yes"}, {id: "47ace7b4-a628-466a-bb10-a7b9decde123", answer: "Some answer"}] where id should be id of question and answer should be answer for question with this id.  
Job Description: ${jobDescription}
Questions: ${JSON.stringify(questions)}`

        const request = {
            contents: [{ role: 'user', parts: [{ text: test }] }],
        }

        const streamingResp = await generativeModel.generateContentStream(
            request,
        )

        return await streamingResp.response
    }
}
