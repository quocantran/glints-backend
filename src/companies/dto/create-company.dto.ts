import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsNotEmpty()
  logo: string;

  @IsOptional()
  usersFollow: string[];
}
