import { ApiProperty } from '@nestjs/swagger'

export class CreateCardDto {
    @ApiProperty({ example: '950d2f56-5a74-4c3b-9cf4-e7b9859a71dc' })
    readonly id: string

    @ApiProperty({ example: 'word to remember' })
    readonly title: string

    @ApiProperty({ example: {} })
    readonly explanation: object

    @ApiProperty({ example: 'wordnet' })
    readonly type: string

    @ApiProperty({ example: '938c2cc0dcc05f2b68c4287040cfcf71' })
    readonly hash: string

    @ApiProperty({ example: 'folder id' })
    readonly folderId: string
}
