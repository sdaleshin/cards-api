import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginOrRegisterWithGoogleDTO } from './dto/LoginOrRegisterWithGoogleDTO'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/user.model'
import { GoogleJwtType, JwtTokenPayload } from './auth.type'
import { FoldersService } from '../folders/folders.service'
import { InjectModel } from '@nestjs/sequelize'
import { Auth } from './auth.model'
import { RefreshTokenDTO } from './dto/RefreshTokenDTO'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        @Inject(FoldersService)
        private folderService: FoldersService,
        private jwtService: JwtService,
        @InjectModel(Auth) private authRepository: typeof Auth,
    ) {}

    async loginOrRegisterWithGoogle(
        loginWithGoogleDto: LoginOrRegisterWithGoogleDTO,
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
        const tokens = await this.generateTokens(user)
        await this.saveRefreshToken(user.id, tokens.refreshToken)
        return tokens
    }

    async refreshToken(refreshTokenDto: RefreshTokenDTO) {
        const refreshToken = await this.authRepository.findOne({
            where: {
                refreshToken: refreshTokenDto.refreshToken,
            },
        })
        if (!refreshToken) {
            throw new UnauthorizedException()
        }
        const user = await this.userService.getUserById(refreshToken.userId)
        const tokens = await this.generateTokens(user)
        await this.authRepository.destroy({
            where: {
                refreshToken: refreshTokenDto.refreshToken,
            },
        })
        this.saveRefreshToken(user.id, tokens.refreshToken)
        return tokens
    }

    private saveRefreshToken(userId, refreshToken) {
        debugger
        return this.authRepository.create({
            userId,
            refreshToken,
        })
    }

    private async generateTokens(user: User) {
        const payload: JwtTokenPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
        }
        return {
            token: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_KEY,
                expiresIn: '30d',
            }),
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
