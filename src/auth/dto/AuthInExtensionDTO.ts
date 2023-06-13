import { ApiProperty } from '@nestjs/swagger'

export class AuthInExtensionDTO {
    @ApiProperty({ example: 'adsfgasdfasdfasdfasdf' })
    readonly accessToken: string
}
