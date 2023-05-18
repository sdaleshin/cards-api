import { ApiProperty } from '@nestjs/swagger'

export class UpdateFolderDto {
    @ApiProperty({ example: 'folder name' })
    readonly name: string

    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    readonly parentId?: string
}
