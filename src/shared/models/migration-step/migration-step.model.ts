import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from '../base';

@Schema({ timestamps: true })
export class MigrationStep extends BaseModel {
  @Prop({ type: String, unique: true })
  name: string;
}

export const MigrationStepSchema = SchemaFactory.createForClass(MigrationStep);
