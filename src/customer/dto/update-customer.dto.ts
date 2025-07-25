import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateCustomerDto {
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: "Email is required" })
  email: string;
}