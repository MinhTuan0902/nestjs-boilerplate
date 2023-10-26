import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const TransformLowerCaseString = () => {
  return applyDecorators(
    Transform(({ value }: { value: string }) => value.toLowerCase()),
  );
};
