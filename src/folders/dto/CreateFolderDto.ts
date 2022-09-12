import { ApiProperty } from '@nestjs/swagger'

export class CreateFolderDto {
    @ApiProperty({ example: 'new folder' })
    readonly name: string

    @ApiProperty({ example: 1 })
    readonly parentId?: number
}
