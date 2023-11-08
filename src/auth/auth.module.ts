import { forwardRef, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { FoldersModule } from '../folders/folders.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { Auth } from './auth.model'

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        SequelizeModule.forFeature([Auth]),
        ConfigModule.forRoot(),
        forwardRef(() => UsersModule),
        forwardRef(() => FoldersModule),
        JwtModule.register({
            secret: process.env.JWT_PRIVATE_KEY,
            signOptions: {
                expiresIn: '1m',
            },
        }),
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
