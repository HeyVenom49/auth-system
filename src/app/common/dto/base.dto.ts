import { type, Type } from "arktype";

export abstract class BaseDto {
  static schema: Type<any>;

  static validate(data: unknown) {
    const result = this.schema(data);

    if (result instanceof type.errors) {
      return {
        success: false,
        error: result.summary,
        value: null,
      };
    }

    return { success: true, error: null, value: result };
  }
}
