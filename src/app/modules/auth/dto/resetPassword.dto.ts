import { type } from "arktype";
import { BaseDto } from "../../../common/dto/base.dto.ts";

export class ResetPasswordDto extends BaseDto {
  static schema = type({
    password: "string >= 6 & /[A-Z]/ & /[0-7]/",
  });
}
