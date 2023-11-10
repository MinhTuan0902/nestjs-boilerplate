import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from '@shared/models';
import { Model } from 'mongoose';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
  ) {}

  async create(token: Token): Promise<Token> {
    return this.tokenModel.create(token);
  }

  async getByValue(value: string): Promise<Token> {
    return this.tokenModel.findOne({ value: value });
  }
}
