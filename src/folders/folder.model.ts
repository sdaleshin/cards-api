import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../users/user.model'
import { Card } from '../cards/card.model'

export interface FolderCreationAttrs {
    name: string
    userId: number
    parentId?: number
}

@Table({ tableName: 'folders' })
export class Folder extends Model<Folder, FolderCreationAttrs> {
    @ApiProperty({ example: 2 })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({ example: 'new folder' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @ApiProperty({ example: 1 })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number

    @ApiProperty({ example: 1 })
    @ForeignKey(() => Folder)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    parentId?: number

    @BelongsTo(() => User, { onDelete: 'cascade', hooks: true })
    user: User

    @BelongsTo(() => Folder, { onDelete: 'cascade', hooks: true })
    parent: Folder

    @HasMany(() => Folder, { onDelete: 'cascade', hooks: true })
    children: Folder[]

    @HasMany(() => Card, { onDelete: 'cascade', hooks: true })
    cards: Card[]
}
