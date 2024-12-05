import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsDateString()
    sysDateTime: string
}

export class InquiryUserDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number

    @IsString()
    @IsNotEmpty()
    username: string

    @IsDateString()
    sysDateTime: string
}

export interface statusCode {
    code: string
    message: string
}
export interface ResponseUserDto {
    userId: number
    username: string
}

export interface ResponseCreateUserDto {
    status: statusCode
    data: ResponseUserDto
}
