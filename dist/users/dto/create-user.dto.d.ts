import mongoose from 'mongoose';
export declare class Company {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
}
export declare class RegisterUserDto {
    email: string;
    password: string;
    role: mongoose.Schema.Types.ObjectId;
    name: string;
    age: string;
    gender: string;
    address: string;
    company: Company;
}
export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    age: string;
    gender: string;
    address: string;
}
