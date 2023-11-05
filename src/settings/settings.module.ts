import { forwardRef, Module } from '@nestjs/common'
import { SettingsController } from './settings.controller'
import { SettingsService } from './settings.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Folder } from '../folders/folder.model'
import { User } from '../users/user.model'
import { AuthModule } from '../auth/auth.module'
import { Settings } from './settings.model'
import { FoldersModule } from '../folders/folders.module'

@Module({
    controllers: [SettingsController],
    providers: [SettingsService],
    imports: [
        SequelizeModule.forFeature([Folder, User, Settings]),
        forwardRef(() => AuthModule),
        forwardRef(() => FoldersModule),
    ],
})
export class SettingsModule {}
