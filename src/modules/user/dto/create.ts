import { Expose, plainToInstance } from "class-transformer";
import { IsEmail, Length } from "class-validator";

export class UserCreateDTO {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @Length(3, 40)
  name: string;

  static from(data: object): UserCreateDTO {
    return plainToInstance(UserCreateDTO, data, {
      excludeExtraneousValues: true,
    });
  }
}
