import { ApiProperty } from '@nestjs/swagger'

export class UpdateCardDto {
    @ApiProperty({ example: 'hash' })
    readonly hash: string

    @ApiProperty({ example: 'title' })
    readonly title: string

    @ApiProperty({ example: {} })
    readonly explanation: object

    @ApiProperty({ example: 'wordnet' })
    readonly type: string

    @ApiProperty({ example: 'folder id' })
    readonly folderId: string
}
