import { ApiProperty } from '@nestjs/swagger'

export class AuthTokensDto {
    @ApiProperty({ example: 'access token' })
    accessToken: string
    @ApiProperty({ example: 'access token' })
    refreshToken: string
}
