//comment.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { User } from '../users/users.entity'
const moment = require('moment-timezone')
moment.tz.setDefault("Asia/Bangkok")
moment.locale("th")

@Entity('COMMENTS')
export class Comment {
    @PrimaryGeneratedColumn({ name: 'COMMENT_ID' })
    commentId: number

    @Column({ type: 'integer', name: 'BOARD_ID' })
    boardId: number

    @Column({ type: 'integer', name: 'USER_ID' })
    userId: number

    @Column({ name: 'COMMENT_TEXT', type: 'text' })
    commentText: string

    @CreateDateColumn({
        name: 'CREATE_DATE',
        type: 'timestamp',
        default: () =>
            `'${moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')}'`,
    })
    createDate: Date

    setCreateDate() {
        this.createDate = moment()
            .tz('Asia/Bangkok')
            .format('YYYY-MM-DD HH:mm:ss')
    }

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'USER_ID' })
    user: User
}
