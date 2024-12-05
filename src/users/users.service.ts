import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getUser(username: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { username },
        })
        return user
    }

    async getUserById(userId: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { userId },
        })
        return user
    }

    async create(username: string): Promise<User> {
        const user = this.userRepository.create({
            username,
        })
        return this.userRepository.save(user)
    }
}
