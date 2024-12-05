import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './comment.entity'
import { CreateBoardDto, GetBoardDto } from './comment.dto'

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ) {}

    async createComment(body: CreateBoardDto): Promise<Comment> {
        const comment = this.commentRepository.create(body)
        return this.commentRepository.save(comment)
    }

    async getCommentsByBoardIdAndUser(body: GetBoardDto): Promise<Comment[]> {
        const { boardId } = body 
        return this.commentRepository.find({
            where: {
                boardId: boardId,
            },
            order: {
                boardId: 'DESC',
            },
            relations: ['user'],
        })
    }

    async deleteComment(commentId: number): Promise<void> {
        await this.commentRepository.delete(commentId)
    }
}
