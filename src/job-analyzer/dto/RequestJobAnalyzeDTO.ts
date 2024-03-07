import { ApiProperty } from '@nestjs/swagger'
import { Question } from '../types/Question'

export class RequestJobAnalyzeDTO {
    @ApiProperty()
    jobDescription: string
    @ApiProperty()
    questions: Question[]
}
