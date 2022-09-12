import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Folder } from 'src/folders/folder.model'

interface UserCreationAttrs {
    email: string
    name: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: 1 })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

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
}
