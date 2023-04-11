import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenDto {
    @ApiProperty({ example: 'refresh token' })
    readonly refreshToken: string
}
