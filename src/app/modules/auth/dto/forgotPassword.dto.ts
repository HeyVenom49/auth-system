import { type, type BaseType } from "arktype";
import { BaseDto } from "../../../common/dto/base.dto.ts";

export class ForgotPasswordDto extends BaseDto {
  static schema = type({
    email: "string.email",
  });
}
