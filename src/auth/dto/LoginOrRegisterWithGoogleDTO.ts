import { ApiProperty } from '@nestjs/swagger'

export class LoginOrRegisterWithGoogleDTO {
    @ApiProperty({ example: 'jwt token from google' })
    readonly credential: string

    @ApiProperty({ example: 'asdfasdfasdfasdfasdf.apps.googleusercontent.com' })
    readonly clientId: string
}
