import { ApiProperty } from '@nestjs/swagger'

export class RequestTranslationForDictionaryDTO {
    @ApiProperty()
    word: string
}
