import { ApiProperty } from '@nestjs/swagger'

export class AuthTokensDTO {
    @ApiProperty({ example: 'access token' })
    accessToken: string
    @ApiProperty({ example: 'access token' })
    refreshToken: string
}
