import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { QueryFailedError } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { Messages } from 'src/constants/messages';

const object = 'Category';

@Controller('category')
export class CategoryController {
  constructor(private categoriesService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ) {
    try {
      return await this.categoriesService.create(createCategoryDto);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value')
      ) {
        throw new HttpException(
          Messages.alreadyExists(object, 'name'),
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          Messages.GENERAL_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.categoriesService.remove(id);
    if (result.affected === 0) {
      throw new HttpException(
        Messages.notFound(object, id),
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
