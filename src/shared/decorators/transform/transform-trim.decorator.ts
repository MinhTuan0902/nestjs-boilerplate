import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const TransformTrimString = () => {
  return applyDecorators(
    Transform(({ value }: { value: string }) => value.trim()),
  );
};
