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
    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    @Column({
        type: DataType.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string

    @ApiProperty({ example: 'refresh token' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    refreshToken: string

    @ApiProperty({ example: '5f16f22e-821a-4d97-ab28-131a87d49d0b' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string

    @BelongsTo(() => User)
    user: User
}
