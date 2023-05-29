import { Body, Controller, Get, Post } from '@nestjs/common'
import { LoginOrRegisterWithGoogleDTO } from './dto/LoginOrRegisterWithGoogleDTO'
import { AuthService } from './auth.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RefreshTokenDTO } from './dto/RefreshTokenDTO'
import { AuthTokensDTO } from './dto/AuthTokensDTO'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Login with google' })
    @ApiResponse({ status: 200, type: AuthTokensDTO })
    @Post('/login-or-register-with-google')
    loginOrRegisterWithGoogle(
        @Body() loginWithGoogleDto: LoginOrRegisterWithGoogleDTO,
    ) {
        return this.authService.loginOrRegisterWithGoogle(loginWithGoogleDto)
    }

    @ApiOperation({ summary: 'Refresh token' })
    @ApiResponse({ status: 200, type: AuthTokensDTO })
    @Post('/refresh-token')
    refreshToken(@Body() refreshTokenDto: RefreshTokenDTO) {
        return this.authService.refreshToken(refreshTokenDto)
    }
}
