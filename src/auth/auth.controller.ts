import { Body, Controller, Get, Post } from '@nestjs/common'
import { LoginOrRegisterWithGoogleDto } from './dto/login-or-register-with-google-dto'
import { AuthService } from './auth.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from '../users/user.model'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Login with google' })
    @ApiResponse({ status: 200, type: User })
    @Post('/login-or-register-with-google')
    loginOrRegisterWithGoogle(
        @Body() loginWithGoogleDto: LoginOrRegisterWithGoogleDto,
    ) {
        return this.authService.loginOrRegisterWithGoogle(loginWithGoogleDto)
    }
}
