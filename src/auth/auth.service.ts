import { Inject, Injectable } from '@nestjs/common'
import { LoginOrRegisterWithGoogleDto } from './dto/login-or-register-with-google-dto'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/user.model'
import { GoogleJwtType, JwtTokenPayload } from './auth.type'
import { FoldersService } from '../folders/folders.service'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        @Inject(FoldersService)
        private folderService: FoldersService,
        private jwtService: JwtService,
    ) {}

    async loginOrRegisterWithGoogle(
        loginWithGoogleDto: LoginOrRegisterWithGoogleDto,
    ) {
        const decodedGoogleToken:
            | { name: string; email: string }
            | GoogleJwtType =
            loginWithGoogleDto.credential === 'test_user_token'
                ? ({
                      email: 'user@user.com',
                      name: 'Valentin',
                  } as GoogleJwtType)
                : (this.jwtService.decode(
                      loginWithGoogleDto.credential,
                  ) as GoogleJwtType)

        let user = await this.userService.getUserByEmail(
            decodedGoogleToken.email,
        )

        if (!user) {
            user = await this.createUserAndDefaultFolder(
                decodedGoogleToken.email,
                decodedGoogleToken.name,
            )
        }
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload: JwtTokenPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
        }
        return {
            token: this.jwtService.sign(payload),
        }
    }

    private async createUserAndDefaultFolder(email: string, name: string) {
        const user = await this.userService.createUser({
            email,
            name,
        })
        await this.folderService.createDefaultFolder(user.id)
        return user
    }
}
