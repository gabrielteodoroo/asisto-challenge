import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateCustomerDto {
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: "Email is required" })
  email: string;
}
