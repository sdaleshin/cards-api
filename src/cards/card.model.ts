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
    id: string
    title: string
    explanation: object
    type: string
    folderId: string
    hash: string
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, CardCreationAttrs> {
    @ApiProperty({ example: 'be320da4-3668-4bd2-b1bc-60f3fcd00ee7' })
    @Column({
        type: DataType.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string

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

    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    @ForeignKey(() => Folder)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    folderId: string

    @BelongsTo(() => Folder)
    folder: Folder
}
