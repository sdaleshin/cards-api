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
    id?: string
    name: string
    userId: string
    parentId?: string
}

@Table({ tableName: 'folders' })
export class Folder extends Model<Folder, FolderCreationAttrs> {
    @ApiProperty({ example: 2 })
    @Column({
        type: DataType.UUID,
        unique: true,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string

    @ApiProperty({ example: 'new folder' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string

    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    @ForeignKey(() => Folder)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    parentId?: string

    @BelongsTo(() => User, { onDelete: 'cascade', hooks: true })
    user: User

    @BelongsTo(() => Folder, { onDelete: 'cascade', hooks: true })
    parent: Folder

    @HasMany(() => Folder, { onDelete: 'cascade', hooks: true })
    children: Folder[]

    @HasMany(() => Card, { onDelete: 'cascade', hooks: true })
    cards: Card[]
}
