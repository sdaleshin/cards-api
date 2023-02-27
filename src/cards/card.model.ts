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
    explanation?: string | null
    folderId: number
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

    @ApiProperty({ example: 'explanation' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    explanation?: string | null

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
