import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  description: string;
}
