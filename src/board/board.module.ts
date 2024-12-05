//board.module.ts
import { Module } from '@nestjs/common'
import { BoardService } from './board.service'
import { BoardController } from './board.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Board } from './board.entity'
import { UsersModule } from '../users/users.module'

@Module({
    imports: [TypeOrmModule.forFeature([Board]), UsersModule],
    providers: [BoardService],
    controllers: [BoardController],
})
export class BoardModule {}
