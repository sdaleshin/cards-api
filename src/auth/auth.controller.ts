import { Body, Controller, Get, Post } from '@nestjs/common'
import { LoginOrRegisterWithGoogleDto } from './dto/login-or-register-with-google-dto'
import { AuthService } from './auth.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RefreshTokenDto } from './dto/refresh-token-dto'
import { AuthTokensDto } from './dto/auth-tokens-dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Login with google' })
    @ApiResponse({ status: 200, type: AuthTokensDto })
    @Post('/login-or-register-with-google')
    loginOrRegisterWithGoogle(
        @Body() loginWithGoogleDto: LoginOrRegisterWithGoogleDto,
    ) {
        return this.authService.loginOrRegisterWithGoogle(loginWithGoogleDto)
    }

    @ApiOperation({ summary: 'Refresh token' })
    @ApiResponse({ status: 200, type: AuthTokensDto })
    @Post('/refresh-token')
    refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto)
    }
}
