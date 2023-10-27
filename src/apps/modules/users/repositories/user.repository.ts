import { ManualRegisterInput } from '@app/modules/auth/inputs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PageOptionInput } from '@shared/inputs';
import { User, UserDocument } from '@shared/models';
import {
  transformFilterToMongoFilterQuery,
  transformSortingOption,
} from '@shared/utils';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateUserInput,
  FilterUsersInput,
  SortingUsersOptionInput,
  UpdateUserInput,
} from '../inputs';

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

  async getByFilter(
    filter: FilterUsersInput,
    sortingOption?: SortingUsersOptionInput,
    pageOption?: PageOptionInput,
  ): Promise<Array<User>> {
    const filterQuery: FilterQuery<UserDocument> =
      transformFilterToMongoFilterQuery(filter);
    const sort = sortingOption ? transformSortingOption(sortingOption) : {};

    return this.userModel
      .find(filterQuery)
      .sort(sort)
      .skip(pageOption && pageOption.skip)
      .limit(pageOption && pageOption.limit)
      .lean()
      .exec();
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

  async countByFilter(filter: FilterUsersInput): Promise<number> {
    const filterQuery: FilterQuery<UserDocument> =
      transformFilterToMongoFilterQuery(filter);

    return this.userModel.countDocuments(filterQuery).lean().exec();
  }
}
