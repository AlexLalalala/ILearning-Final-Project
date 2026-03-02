import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category | null> {
    const insertResult =
      await this.categoriesRepository.insert(createCategoryDto);
    return { ...createCategoryDto, ...insertResult.raw[0] };
  }

  remove(id: number) {
    return this.categoriesRepository.delete(id);
  }
}
