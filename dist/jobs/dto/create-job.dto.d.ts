import { Company } from 'src/users/dto/create-user.dto';
export declare class CreateJobDto {
    name: string;
    description: string;
    skills: string[];
    company: Company;
    salary: number;
    level: string;
    startDate: Date;
    quantity: number;
    location: string;
    endDate: Date;
    isActive: Boolean;
}
