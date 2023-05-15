import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Folder } from 'src/folders/folder.model'

export interface CardCreationAttrs {
    title: string
    explanation: object
    type: string
    folderId: number
    hash: string
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, CardCreationAttrs> {
    @ApiProperty({ example: 2 })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({ example: 'title' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string

    @ApiProperty({ example: 'wordnet' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type: string

    @ApiProperty({ example: 'hash' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hash: string

    @ApiProperty({ example: {} })
    @Column({
        type: DataType.JSONB,
        allowNull: false,
    })
    explanation: object

    @ApiProperty({ example: 1 })
    @ForeignKey(() => Folder)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    folderId: number

    @BelongsTo(() => Folder)
    folder: Folder
}
