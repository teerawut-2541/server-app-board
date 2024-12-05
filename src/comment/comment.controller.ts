import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common'
import { CommentService } from './comment.service'
import { Comment } from './comment.entity'
import { CommentDto, CreateBoardDto, GetBoardDto, ResponseCommentDto } from './comment.dto'

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post('create')
    createComment(@Body() body: CreateBoardDto): Promise<Comment> {
        return this.commentService.createComment(body)
    }

    @Post('')
    async getCommentsByBoardId(@Body() body: GetBoardDto): Promise<ResponseCommentDto> {
        const comment = await this.commentService.getCommentsByBoardIdAndUser(body)
        const list: CommentDto[] = comment.map((comment) => ({
            username: comment.user.username, 
            commentText: comment.commentText,
            createDate: comment.createDate
        }))
    
        const responseData: ResponseCommentDto = {
            status: {
                code: '200',
                message: 'success',
            },
            data: list,
        }
    
        return responseData
    }
}
