import { forwardRef, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { FoldersModule } from '../folders/folders.module'

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        ConfigModule.forRoot(),
        forwardRef(() => [UsersModule, FoldersModule]),
        JwtModule.register({
            secret: process.env.PG_DB_NAME,
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
