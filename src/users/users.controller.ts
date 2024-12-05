import { Body, Controller, NotFoundException, Post } from '@nestjs/common'
import {
    CreateUserDto,
    InquiryUserDto,
    ResponseCreateUserDto,
} from './user.dto'
import { UsersService } from './users.service'
import { User } from './users.entity'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/create')
    async create(@Body() body: CreateUserDto): Promise<ResponseCreateUserDto> {
        const user = await this.usersService.getUser(body.username)
        if (user) {
            throw new NotFoundException({
                status: {
                    code: '405',
                    message: 'Found user in system',
                },
            })
        }
        const createUser = await this.usersService.create(body.username)
        const responseData: ResponseCreateUserDto = {
            status: {
                code: '200',
                message: 'success',
            },
            data: {
                userId: createUser.userId,
                username: createUser.username,
            },
        }
        return responseData
    }

    @Post('/inquiry')
    async inquiry(
        @Body() body: InquiryUserDto,
    ): Promise<ResponseCreateUserDto> {
        let user: User = null
        if (body.userId) {
            user = await this.usersService.getUserById(body.userId)
        } else if (body.username) {
            user = await this.usersService.getUser(body.username)
        }

        if (!user) {
            throw new NotFoundException({
                status: {
                    code: '404',
                    message: 'User not found',
                },
            })
        }

        const responseData: ResponseCreateUserDto = {
            status: {
                code: '200',
                message: 'success',
            },
            data: {
                userId: user.userId,
                username: user.username,
            },
        }
        return responseData
    }
}
