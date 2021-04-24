import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { nanoid } from 'nanoid';
import { InjectModel } from '@nestjs/mongoose';
import { Link, LinkDocuemnt } from './schemas/link.schema';
import { Model } from 'mongoose';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(Link.name) private readonly linkModel: Model<LinkDocuemnt>,
  ) {}
  async create(createLinkDto: CreateLinkDto, user?: any) {
    const { id: userId } = user;
    const shortenedLink = nanoid(15);
    const createdLink = await this.linkModel.create({
      ...createLinkDto,
      creator: userId,
      shortenedLink,
    });
    return createdLink.save();
  }

  async findAll(user: any) {
    return this.linkModel.find({ creator: user.id });
  }

  async findOneByShortenedLink(shortenedLink: string) {
    const foundLink = this.linkModel.findOne({ shortenedLink });
    if (!foundLink) {
      throw new NotFoundException('Link with provided id is not found');
    }
    return foundLink;
  }

  async findOne(user: any, id: string) {
    const foundPost = await this.linkModel.findById(id).populate('visitors');
    if (!foundPost) {
      throw new NotFoundException('Link with provided id is not found');
    }
    if (foundPost.creator.toString() !== user.id) {
      throw new ForbiddenException();
    }
    return foundPost;
  }

  async update(user: any, id: string, updateLinkDto: UpdateLinkDto) {
    const foundPost = await this.linkModel.findById(id);
    if (!foundPost) {
      throw new NotFoundException('Link with provided id is not found');
    }
    if (foundPost.creator.toString() !== user.id) {
      throw new ForbiddenException();
    }
    return this.linkModel.findByIdAndUpdate(id, updateLinkDto, { new: true });
  }

  async remove(user: any, id: string) {
    const foundPost = await this.linkModel.findById(id);
    if (!foundPost) {
      throw new NotFoundException('Link with provided id is not found');
    }
    if (foundPost.creator.toString() !== user.id) {
      throw new ForbiddenException();
    }
    return foundPost.delete();
  }
}
