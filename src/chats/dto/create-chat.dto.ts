import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChatDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsNotEmpty({ message: 'Type is required' })
    type: string;

    @IsOptional()
    @IsString()
    fileUrl: string;

}
