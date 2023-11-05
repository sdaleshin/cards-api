import { ApiProperty } from '@nestjs/swagger'

export class UpdateSettingsDto {
    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    readonly extensionTranslationFolderId: string

    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    readonly dictionaryFolderId: string
}
