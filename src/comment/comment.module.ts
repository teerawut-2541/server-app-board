import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { Comment } from './comment.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardModule } from '../board/board.module'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), BoardModule], 
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
