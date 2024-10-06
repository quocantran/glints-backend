import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  fileUrl: string;
}
