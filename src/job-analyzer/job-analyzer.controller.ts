import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { JobAnalyzerService } from './job-analyzer.service'
import { RequestJobAnalyzeDTO } from './dto/RequestJobAnalyzeDTO'

@Controller('job-analyzer')
export class JobAnalyzerController {
    constructor(private jobAnalyzerService: JobAnalyzerService) {}

    @ApiOperation({ summary: 'Translate word in context' })
    @ApiResponse({ status: 200 })
    @Post('/analyze')
    async analyze(@Body() requestTranslationDTO: RequestJobAnalyzeDTO) {
        return await this.jobAnalyzerService.analyze(
            requestTranslationDTO.jobDescription,
            requestTranslationDTO.questions,
        )
    }
}
