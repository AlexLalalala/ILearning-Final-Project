import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { UpdateDateColumn } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.itemService.findOne(id);
    if (result) {
      return result;
    } else {
      throw new HttpException(
        `Item with id: ${id} can not be found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body(new ValidationPipe()) createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateItemDto: UpdateItemDto,
  ) {
    const result = await this.itemService.update(id, updateItemDto);
    if (!result.affected) {
      throw new HttpException(
        `Item with id: ${id} can not be found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    const result = await this.itemService.remove(id);
    if (!result.affected) {
      throw new HttpException(
        `Item with id: ${id} can not be found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
