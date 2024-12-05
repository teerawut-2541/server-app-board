import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsOptional,
    IsInt,
    IsNumber,
} from 'class-validator'

export class CreateBoardDto {
    @IsOptional()
    @IsDateString()
    sysDateTime: string

    @IsNotEmpty()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsString()
    boardType: string

    @IsNotEmpty()
    @IsNumber()
    userId: number
}

export class DeleteBoardDto {
    @IsNotEmpty()
    @IsInt()
    boardId: number

    @IsNotEmpty()
    @IsInt()
    userId: number
}

export class UpdateBoardDto {
    @IsNotEmpty()
    @IsInt()
    boardId: number

    @IsOptional()
    @IsDateString()
    sysDateTime: string

    @IsNotEmpty()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsString()
    boardType: string

    @IsNotEmpty()
    @IsInt()
    userId: number
}

export class GetBoardUserDto {
    @IsOptional()
    @IsDateString()
    sysDateTime: string

    @IsNotEmpty()
    @IsInt()
    userId: number
}

export class GetBoardDto {
    @IsOptional()
    @IsDateString()
    sysDateTime: string

    @IsNotEmpty()
    @IsInt()
    boardId: number
}

export interface statusCode {
    code: string
    message: string
}

export interface ResponseBoardDto {
    status: statusCode
    data: BoardInfoDto
}

export interface ResponseBoardArrayDto {
    status: statusCode
    data: BoardInfoDto[]
}

export interface BoardInfoDto {
    boardId?: number
    title: string
    content: string
    boardType: string
    commentCount: number
    createDate: Date
    username: string
}
