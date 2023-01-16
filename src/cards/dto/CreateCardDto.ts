import { ApiProperty } from '@nestjs/swagger'

export class CreateCardDto {
    @ApiProperty({ example: 'title' })
    readonly title: string

    @ApiProperty({ example: 'explanation' })
    readonly explanation: string

    @ApiProperty({ example: 1 })
    readonly folderId: number
}