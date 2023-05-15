import { ApiProperty } from '@nestjs/swagger'

export class CreateCardDto {
    @ApiProperty({ example: 'title' })
    readonly title: string

    @ApiProperty({ example: {} })
    readonly explanation: object

    @ApiProperty({ example: 'wordnet' })
    readonly type: string

    @ApiProperty({ example: 1 })
    readonly folderId: number
}
