import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import mongoose from 'mongoose';

export class FindByJobResumeDto {
  @IsNotEmpty()
  jobId: string;

  @IsOptional()
  current: string;

  @IsOptional()
  pageSize: string;
}
