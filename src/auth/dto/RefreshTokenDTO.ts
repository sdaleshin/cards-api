import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenDTO {
    @ApiProperty({ example: 'refresh token' })
    readonly refreshToken: string
}
