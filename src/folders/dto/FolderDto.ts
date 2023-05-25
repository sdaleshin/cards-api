import { ApiProperty } from '@nestjs/swagger'

export class FolderDto {
    @ApiProperty({ example: 'id ' })
    readonly id: string

    @ApiProperty({ example: 'new folder' })
    readonly name: string

    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    readonly parentId?: string

    @ApiProperty({ example: '2023-05-18T19:02:09.189Z' })
    readonly createdAt: Date

    @ApiProperty({ example: '2023-05-18T19:02:09.189Z' })
    readonly updatedAt: Date

    @ApiProperty({ example: '2023-05-18T19:02:09.189Z' })
    readonly cardsUpdatedAt: Date

    @ApiProperty({ example: 5 })
    readonly cardsCount: number
}
