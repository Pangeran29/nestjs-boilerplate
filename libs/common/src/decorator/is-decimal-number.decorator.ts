import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isDecimalNumber', async: false })
export class IsDecimalConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (value === undefined || value === null) {
      return false;
    }

    const regex = /^[+-]?([0-9]*[.])?[0-9]+$/;
    return regex.test(value.toString());
  }

  defaultMessage(): string {
    return 'Invalid decimal number';
  }
}

export function IsDecimalNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDecimalConstraint,
    });
  };
}
