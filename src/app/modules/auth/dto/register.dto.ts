import { type } from "arktype";
import { BaseDto } from "../../../common/dto/base.dto.ts";

export class RegisterDto extends BaseDto {
  static schema = type({
    username: "string > 3",
    email: "string.email",
    password: "string >= 6",
    role: "'customer'",
  }).onUndeclaredKey("reject");
}

export type RegisterDtoType = typeof RegisterDto.schema.infer;
