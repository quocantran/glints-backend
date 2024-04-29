import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchJobDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  location: string;
}
