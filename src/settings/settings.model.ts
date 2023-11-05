import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    Table,
    UpdatedAt,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../users/user.model'
import { Folder } from '../folders/folder.model'

export interface SettingsCreationAttrs {
    id?: string
    userId: string
    extensionTranslationFolderId: string
    dictionaryFolderId: string
}

@Table({ tableName: 'settings' })
export class Settings extends Model<Settings, SettingsCreationAttrs> {
    @ApiProperty({ example: 2 })
    @Column({
        type: DataType.UUID,
        unique: true,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string

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
        allowNull: false,
    })
    extensionTranslationFolderId: string

    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    @ForeignKey(() => Folder)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    dictionaryFolderId: string

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date

    @BelongsTo(() => User, { onDelete: 'cascade', hooks: true })
    user: User

    @BelongsTo(() => Folder, {
        hooks: true,
        foreignKey: 'extensionTranslationFolderId',
    })
    extensionTranslationFolder: Folder

    @BelongsTo(() => Folder, {
        hooks: true,
        foreignKey: 'dictionaryFolderId',
    })
    dictionaryFolder: Folder
}
