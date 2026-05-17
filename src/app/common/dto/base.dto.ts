import { type, Type } from "arktype";

type ValidationResult =
  | {
      success: true;
      errors: null;
      data: unknown;
    }
  | {
      success: false;
      errors: string;
      data: null;
    };

export abstract class BaseDto {
  static schema: Type<any>;

  static validate(data: unknown): ValidationResult {
    const result = this.schema(data);

    if (result instanceof type.errors) {
      return {
        success: false,
        errors: result.summary,
        data: null,
      };
    }

    return { success: true, errors: null, data: result };
  }
}
