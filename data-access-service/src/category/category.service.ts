import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    return this.categoryModel.insertMany([dto]);
  }

  async findAll() {
    return this.categoryModel.find().exec();
  }
}
