import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Board } from './board.entity'
import { CreateBoardDto, DeleteBoardDto, UpdateBoardDto } from './board.dto'
import { UsersService } from '../users/users.service'

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        private readonly usersService: UsersService,
    ) {}

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const user = await this.usersService.getUserById(createBoardDto.userId)
        if (!user) {
            throw new NotFoundException({
                status: {
                    code: '404',
                    message: 'User not found',
                },
            })
        }
        const board = this.boardRepository.create({ ...createBoardDto, user })
        return this.boardRepository.save(board)
    }

    async getBoardById(boardId: number): Promise<Board> {
        return this.boardRepository.findOne({
            where: { boardId },
            relations: ['user'],
        })
    }

    async getBoardByUserId(userId: number): Promise<Board[]> {
        return this.boardRepository.find({
            where: { user: { userId } },
            order: {
                boardId: 'DESC',
            },
            relations: ['user'],
        })
    }

    async getAllBoards(): Promise<Board[]> {
        const boards = await this.boardRepository.find({
            order: {
                boardId: 'DESC',
            },
            relations: ['user'],
        })

        return boards
    }

    async updateBoard(updateBoardDto: UpdateBoardDto): Promise<Board> {
        const board = await this.boardRepository.findOne({
            where: { boardId: updateBoardDto.boardId },
        })

        if (!board) {
            throw new NotFoundException({
                status: {
                    code: '406',
                    message: 'Board not found',
                },
            })
        }

        board.title = updateBoardDto.title || board.title
        board.content = updateBoardDto.content || board.content
        board.boardType = updateBoardDto.boardType || board.boardType
        board.updateDate = new Date()

        return this.boardRepository.save(board)
    }

    async deleteBoard(deleteBoardDto: DeleteBoardDto): Promise<Board> {
        const board = await this.boardRepository.findOne({
            where: { boardId: deleteBoardDto.boardId },
        })

        if (!board) {
            throw new NotFoundException({
                status: {
                    code: '406',
                    message: 'Board not found',
                },
            })
        }

        await this.boardRepository.remove(board)

        return board
    }
}
