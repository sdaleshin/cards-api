import { ApiProperty } from '@nestjs/swagger'

export class RequestJobAnalyzeDTO {
    @ApiProperty()
    jobDescription: string
}
