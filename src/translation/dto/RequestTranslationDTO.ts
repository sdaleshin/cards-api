import { ApiProperty } from '@nestjs/swagger'

export class RequestTranslationDTO {
    @ApiProperty()
    word: string
    @ApiProperty()
    context: string
}
