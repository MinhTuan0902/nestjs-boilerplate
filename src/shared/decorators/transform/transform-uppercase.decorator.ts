import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const TransformUpperCaseString = () => {
  return applyDecorators(
    Transform(({ value }: { value: string }) => value.toUpperCase()),
  );
};
