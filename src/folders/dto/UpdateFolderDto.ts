import { ApiProperty } from '@nestjs/swagger'

export class UpdateFolderDto {
    @ApiProperty({ example: 'folder name' })
    readonly name: string

    @ApiProperty({ example: 1 })
    readonly parentId?: number
}
