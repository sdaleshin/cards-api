import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginOrRegisterWithGoogleDTO } from './dto/LoginOrRegisterWithGoogleDTO'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/user.model'
import { GoogleJwtType, JwtTokenPayload } from './auth.type'
import { InjectModel } from '@nestjs/sequelize'
import { Auth } from './auth.model'
import { RefreshTokenDTO } from './dto/RefreshTokenDTO'
import { AuthInExtensionDTO } from './dto/AuthInExtensionDTO'
import fetch from 'node-fetch'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        @InjectModel(Auth) private authRepository: typeof Auth,
    ) {}

    async loginOrRegisterWithGoogle(
        loginWithGoogleDto: LoginOrRegisterWithGoogleDTO,
    ) {
        const decodedGoogleToken = this.jwtService.decode(
            loginWithGoogleDto.credential,
        ) as GoogleJwtType

        return this.authWithEmailAndName({
            name: decodedGoogleToken.name,
            email: decodedGoogleToken.email,
        })
    }

    private async authWithEmailAndName({
        name,
        email,
    }: {
        name: string
        email: string
    }) {
        let user = await this.userService.getUserByEmail(email)

        if (!user) {
            user = await this.createUser(email, name)
        }
        const tokens = await this.generateTokens(user)
        await this.saveRefreshToken(user.id, tokens.refreshToken)
        return tokens
    }

    async authInExtension(authInExtensionDTO: AuthInExtensionDTO) {
        const response = await fetch(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: {
                    Authorization: 'Bearer ' + authInExtensionDTO.accessToken,
                },
            },
        )

        const data = await response.json()
        return this.authWithEmailAndName({
            name: data.name,
            email: data.email,
        })
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

    private async createUser(email: string, name: string) {
        return await this.userService.createUser({
            email,
            name,
        })
    }
}
