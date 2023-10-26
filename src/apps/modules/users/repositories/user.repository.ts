import { ManualRegisterInput } from '@app/modules/auth/inputs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@shared/models';
import { Model } from 'mongoose';
import { CreateUserInput, UpdateUserInput } from '../inputs';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(input: ManualRegisterInput | CreateUserInput): Promise<User> {
    return this.userModel.create(input);
  }

  async getByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).lean().exec();
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id).lean().exec();
  }

  async update(updateUserInput: UpdateUserInput): Promise<boolean> {
    const { matchedCount, modifiedCount } = await this.userModel.updateOne(
      { _id: updateUserInput.userId },
      { $set: updateUserInput },
    );

    return !!matchedCount && !!modifiedCount;
  }

  async deleteById(id: string): Promise<boolean> {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id });
    return !!deletedCount;
  }
}
