import { forwardRef, Module } from '@nestjs/common'
import { CardsController } from './cards.controller'
import { CardsService } from './cards.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Folder } from '../folders/folder.model'
import { Card } from './card.model'
import { AuthModule } from '../auth/auth.module'

@Module({
    controllers: [CardsController],
    providers: [CardsService],
    imports: [
        SequelizeModule.forFeature([Folder, Card]),
        forwardRef(() => AuthModule),
    ],
})
export class CardsModule {}
