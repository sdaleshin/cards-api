import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'
import { CreateUserDto } from './dto/create-user-dto'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findByPk(id)
        return user
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        return user
    }
}
