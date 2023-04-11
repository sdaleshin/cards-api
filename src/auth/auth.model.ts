import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../users/user.model'

export interface AuthCreationAttrs {
    userId: string
    refreshToken: string
}

@Table({ tableName: 'auth' })
export class Auth extends Model<Auth, AuthCreationAttrs> {
    @ApiProperty({ example: 1 })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({ example: 'refresh token' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    refreshToken: string

    @ApiProperty({ example: 1 })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number

    @BelongsTo(() => User)
    user: User
}
