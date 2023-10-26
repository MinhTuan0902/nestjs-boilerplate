import { Injectable, PipeTransform } from '@nestjs/common';
import { ValidationFailedError } from '@shared/errors';
import { isMongoId } from 'class-validator';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any) {
    if (!isMongoId(value)) {
      throw new ValidationFailedError(
        'The provided id must be a valid object id',
      );
    }

    return value;
  }
}
