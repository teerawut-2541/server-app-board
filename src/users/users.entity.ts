// users.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm'
import { Board } from '../board/board.entity'
import { Comment } from '../comment/comment.entity'
const moment = require('moment-timezone')
moment.tz.setDefault("Asia/Bangkok")
moment.locale("th")

@Entity('USERS')
export class User {
    @PrimaryGeneratedColumn({ name: 'USER_ID' })
    userId: number

    @Column({ type: 'varchar', length: 255, name: 'USERNAME', nullable: false })
    username: string

    @OneToMany(() => Board, (board) => board.user)
    boards: Board[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]

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
}
