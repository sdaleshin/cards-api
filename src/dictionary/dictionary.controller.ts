import { Controller, Get, Param } from '@nestjs/common'
import { DictionaryService } from './dictionary.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DefinitionDto } from './dto/DefinitionDto'

@ApiTags('Dictionary')
@Controller('dictionary')
export class DictionaryController {
    constructor(private dictionaryService: DictionaryService) {}

    @ApiOperation({ summary: 'Search word' })
    @ApiResponse({ status: 200, type: [DefinitionDto] })
    @Get(':word')
    async search(@Param('word') word: string) {
        return await this.dictionaryService.search(word)
    }
}
