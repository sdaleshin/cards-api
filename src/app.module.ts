import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { User } from './users/user.model'
import { AuthModule } from './auth/auth.module'
import { FoldersModule } from './folders/folders.module'
import { CardsModule } from './cards/cards.module'
import { Folder } from './folders/folder.model'
import { Card } from './cards/card.model'
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DB_NAME,
            models: [User, Folder, Card],
            autoLoadModels: true,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        }),
        UsersModule,
        AuthModule,
        FoldersModule,
        CardsModule,
        DictionaryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
