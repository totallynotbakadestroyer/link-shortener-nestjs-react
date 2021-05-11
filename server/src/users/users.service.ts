import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const exist = await this.userModel.findOne({ email: createUserDto.email });
    if (exist) {
      throw new ConflictException('User with such email already exists');
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }

  findOne(id: number) {
    return this.userModel.findById(id).lean();
  }

  async update(user: any, updateUserDto: UpdateUserDto) {
    const foundUser = await this.userModel.findById(user.id);
    console.log(updateUserDto);
    if (updateUserDto.newEmail) {
      if (updateUserDto.oldEmail === foundUser.email) {
        foundUser.email = updateUserDto.newEmail;
      } else {
        throw new BadRequestException('Wrong email');
      }
    }
    if (updateUserDto.newPassword) {
      if (await bcrypt.compare(updateUserDto.oldPassword, foundUser.password)) {
        foundUser.password = updateUserDto.newPassword;
      } else {
        throw new BadRequestException('Wrong password');
      }
    }
    return foundUser.save();
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id).lean();
  }
}
