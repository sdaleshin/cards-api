import { forwardRef, Module } from '@nestjs/common'
import { FoldersController } from './folders.controller'
import { FoldersService } from './folders.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from '../auth/auth.module'
import { Folder } from './folder.model'
import { User } from 'src/users/user.model'

@Module({
    controllers: [FoldersController],
    providers: [FoldersService],
    imports: [
        SequelizeModule.forFeature([Folder, User]),
        forwardRef(() => AuthModule),
    ],
    exports: [FoldersService],
})
export class FoldersModule {}
