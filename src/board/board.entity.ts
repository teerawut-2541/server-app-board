// board.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BeforeUpdate,
    BeforeInsert,
} from 'typeorm'
import { User } from '../users/users.entity'
const moment = require('moment-timezone')
moment.tz.setDefault("Asia/Bangkok")
moment.locale("th")

@Entity('BOARD')
export class Board {
    @PrimaryGeneratedColumn({ name: 'BOARD_ID' })
    boardId: number

    @ManyToOne(() => User, (user) => user.boards)
    @JoinColumn({ name: 'USER_ID' })
    user: User

    @Column({ type: 'varchar', length: 255, name: 'TITLE' })
    title: string

    @Column({ type: 'text', name: 'CONTENT', nullable: true })
    content: string | null

    @Column({
        type: 'timestamp',
        name: 'CREATE_DATE',
        default: () =>
            `'${moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')}'`,
    })
    createDate: Date

    @BeforeInsert()
    setCreateDate() {
        this.createDate = moment()
            .tz('Asia/Bangkok')
            .format('YYYY-MM-DD HH:mm:ss')
    }

    @Column({
        type: 'timestamp',
        name: 'UPDATE_DATE',
        default: () =>
            `'${moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')}'`,
    })
    updateDate: Date

    @BeforeUpdate()
    setUpdateDate() {
        this.updateDate = moment()
            .tz('Asia/Bangkok')
            .format('YYYY-MM-DD HH:mm:ss')
    }

    @Column({
        type: 'integer',
        default: 0,
        name: 'COMMENT_COUNT',
        nullable: true,
    })
    commentCount: number

    @Column({ type: 'varchar', length: 50, name: 'BOARD_TYPE' })
    boardType: string
}
