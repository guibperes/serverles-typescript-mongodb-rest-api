import { Expose, instanceToInstance } from "class-transformer";
import { IsEmail, Length } from "class-validator";

import { UserCreateDTO } from "./dto";

export class User {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @Length(3, 40)
  name: string;

  static from(userCreateDTO: UserCreateDTO): User {
    return instanceToInstance(userCreateDTO);
  }
}
