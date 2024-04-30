import mongoose from 'mongoose';
declare class Company {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
}
export declare class UpdateUserDto {
    email: string;
    role: mongoose.Schema.Types.ObjectId;
    name: string;
    age: string;
    gender: string;
    address: string;
    company: Company;
}
export declare class UpdateUserPasswordDto {
    password: string;
    newPassword: string;
    repeatedPassword: string;
}
export {};
