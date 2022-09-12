import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.ru' })
    readonly email: string

    @ApiProperty({ example: 'name' })
    readonly name?: string
}
