import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { TranslationService } from './translation.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RequestTranslationDTO } from './dto/RequestTranslationDTO'
import { RequestTranslationForDictionaryDTO } from './dto/RequestTranslationForDictionaryDTO'

@Controller('translation')
export class TranslationController {
    constructor(private translationService: TranslationService) {}

    @ApiOperation({ summary: 'Translate word in context' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Post()
    async translate(@Body() requestTranslationDTO: RequestTranslationDTO) {
        return await this.translationService.translate(
            requestTranslationDTO.word,
            requestTranslationDTO.context,
        )
    }

    @ApiOperation({ summary: 'Translate word for dictionary' })
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Post('/for-dictionary')
    async translateForDictionary(
        @Body() dto: RequestTranslationForDictionaryDTO,
    ) {
        return await this.translationService.translateForDictionary(dto.word)
    }
}
