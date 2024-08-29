import { IsNotEmpty, IsString } from 'class-validator';

export class GetPaginateElasticsearchDto {
  @IsNotEmpty()
  @IsString()
  index: string;

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  size: string;
}
