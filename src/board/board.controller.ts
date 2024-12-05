import { Controller, Post, Body, NotFoundException } from '@nestjs/common'
import { BoardService } from './board.service'
import {
    CreateBoardDto,
    DeleteBoardDto,
    GetBoardDto,
    GetBoardUserDto,
    ResponseBoardArrayDto,
    ResponseBoardDto,
    UpdateBoardDto,
} from './board.dto'
import { UsersService } from '../users/users.service'

@Controller('board')
export class BoardController {
    constructor(
        private readonly usersService: UsersService,
        private readonly boardService: BoardService,
    ) {}

    @Post('create')
    async create(@Body() body: CreateBoardDto) {
        const board = await this.boardService.createBoard(body)
        const responseData: ResponseBoardDto = {
            status: {
                code: '200',
                message: 'success',
            },
            data: {
                boardId: board.boardId,
                title: board.title,
                content: board.content,
                boardType: board.boardType,
                commentCount: board.commentCount,
                createDate: board.createDate,
                username: board.user.username,
            },
        }
        return responseData
    }

    @Post('')
    async findAll() {
        const board = await this.boardService.getAllBoards()
        const boardMap = board.map((obj) => ({
            boardId: obj.boardId,
            title: obj.title,
            content: obj.content,
            boardType: obj.boardType,
            commentCount: obj.commentCount,
            createDate: obj.createDate,
            username: obj.user.username,
        }))
        const responseData: ResponseBoardArrayDto = {
            status: {
                code: '200',
                message: 'success',
            },
            data: boardMap,
        }
        return responseData
    }

    @Post('/id')
    async findOne(@Body() body: GetBoardDto) {
        const board = await this.boardService.getBoardById(body.boardId)
        const responseData: ResponseBoardDto = {
            status: {
                code: '200',
                message: 'success',
            },
            data: {
                boardId: board.boardId,
                title: board.title,
                content: board.content,
                boardType: board.boardType,
                commentCount: board.commentCount,
                createDate: board.createDate,
                username: board.user.username,
            },
        }
        return responseData
    }

    @Post('/filter/user')
    async findAllByUser(@Body() body: GetBoardUserDto) {
        const board = await this.boardService.getBoardByUserId(body.userId)
        const boardMap = board.map((obj) => ({
            boardId: obj.boardId,
            title: obj.title,
            content: obj.content,
            boardType: obj.boardType,
            commentCount: obj.commentCount,
            createDate: obj.createDate,
            username: obj.user.username,
        }))
        const responseData: ResponseBoardArrayDto = {
            status: {
                code: '200',
                message: 'success',
            },
            data: boardMap,
        }
        return responseData
    }

    @Post('update')
    async updateBoard(@Body() body: UpdateBoardDto) {
        const user = await this.usersService.getUserById(body.userId)
        if (!user) {
            throw new NotFoundException({
                status: {
                    code: '404',
                    message: 'User not found',
                },
            })
        }
        const board = await this.boardService.updateBoard(body)
        const responseData: ResponseBoardDto = {
            status: {
                code: '200',
                message: 'success',
            },
            data: {
                boardId: board.boardId,
                title: board.title,
                content: board.content,
                boardType: board.boardType,
                commentCount: board.commentCount,
                createDate: board.createDate,
                username: user.username,
            },
        }
        return responseData
    }

    @Post('delete')
    async deleteBoard(@Body() body: DeleteBoardDto) {
        const user = await this.usersService.getUserById(body.userId)
        if (!user) {
            throw new NotFoundException({
                status: {
                    code: '404',
                    message: 'User not found',
                },
            })
        }
        const board = await this.boardService.deleteBoard(body)
        const responseData: ResponseBoardDto = {
            status: {
                code: '200',
                message: 'success',
            },
            data: {
                boardId: board.boardId,
                title: board.title,
                content: board.content,
                boardType: board.boardType,
                commentCount: board.commentCount,
                createDate: board.createDate,
                username: user.username,
            },
        }
        return responseData
    }
}
