import { IsNotEmpty, IsOptional } from 'class-validator';

export class FollowCompanyDto {
  @IsNotEmpty({ message: 'companyId is required' })
  companyId: string;
}
