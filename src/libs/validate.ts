import { validate, ValidationError } from "class-validator";

interface ValidationResponse {
  invalid: boolean;
  errors: object;
}

const objectValidationReduce = (acc: object, error: ValidationError) => ({
  ...acc,
  [error.property]: Object.keys(error.constraints).map(
    key => error.constraints[key],
  ),
});

export const object = async (data: object): Promise<ValidationResponse> => {
  const validation = await validate(data);

  return {
    invalid: validation.length > 0,
    errors: validation.reduce(objectValidationReduce, {}),
  };
};
