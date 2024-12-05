import { IsOptional, IsNotEmpty, IsDateString, IsString, IsNumber } from 'class-validator'

export class CreateBoardDto {
    @IsOptional()
    @IsDateString()
    sysDateTime: string

    @IsOptional()
    @IsString()
    commentText: string

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    boardId: number
}

export class GetBoardDto {
    @IsOptional()
    @IsDateString()
    sysDateTime: string

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsNumber()
    boardId: number
}

export interface statusCode {
    code: string
    message: string
}

export interface ResponseCommentDto {
    status: statusCode
    data: CommentDto[]
}

export interface CommentDto {
    commentText: string
    username: string
    createDate: Date
}


