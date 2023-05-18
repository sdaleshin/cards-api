import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Folder } from 'src/folders/folder.model'
import { Auth } from '../auth/auth.model'

interface UserCreationAttrs {
    email: string
    name: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: 'id' })
    @Column({
        type: DataType.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string

    @ApiProperty({ example: 'user@example.ru' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string

    @ApiProperty({ example: 'sergey aleshin' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name?: string | null

    @HasMany(() => Folder)
    folders: Folder[]

    @HasMany(() => Auth, { onDelete: 'cascade', hooks: true })
    auths: Auth[]
}
