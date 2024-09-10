import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  parentId: string;
}
