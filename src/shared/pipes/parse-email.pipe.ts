import { Injectable, PipeTransform } from '@nestjs/common';
import { ValidationFailedError } from '@shared/errors';
import { isEmail } from 'class-validator';

@Injectable()
export class ParseEmailPipe implements PipeTransform {
  transform(value: string) {
    value = value.trim().toLowerCase();
    if (!isEmail(value)) {
      throw new ValidationFailedError(
        'The provided value must be a valid email',
      );
    }

    return value;
  }
}
