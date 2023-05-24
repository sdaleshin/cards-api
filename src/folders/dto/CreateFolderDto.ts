import { ApiProperty } from '@nestjs/swagger'

export class CreateFolderDto {
    @ApiProperty({ example: 'id ' })
    readonly id: string

    @ApiProperty({ example: 'new folder' })
    readonly name: string

    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    readonly parentId?: string
}
