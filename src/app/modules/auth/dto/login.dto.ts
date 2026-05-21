import { type } from "arktype";
import { BaseDto } from "../../../common/dto/base.dto.ts";

export class LoginDto extends BaseDto {
  static schema = type({
    username: "string > 3",
    password: "string >= 6",
  }).onUndeclaredKey("reject");
}

export type LoginDtoType = typeof LoginDto.schema.infer;
