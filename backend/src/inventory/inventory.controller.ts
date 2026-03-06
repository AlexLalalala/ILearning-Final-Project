import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InventoryService } from './inventory.service';
import { QueryFailedError, Repository } from 'typeorm';
import type { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import type { UUID } from 'crypto';

@Controller('inventory')
export class InventoryController {
  constructor(
    private inventoriesService: InventoryService,
    private usersService: UserService,
  ) {}

  @Get()
  findAll() {
    try {
      return this.inventoriesService.findAll();
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const response = await this.inventoriesService.findOne(id);
    if (response) {
      return response;
    } else {
      throw new HttpException(
        `Inventory with id: ${id} can not be found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async create(@Body(new ValidationPipe()) createPostDto: CreateInventoryDto) {
    // const user_id: UUID = 'c4704866-8ec2-4f17-8759-9589ec0829bb';
    // const user: User | null = await this.usersService.findOne(user_id);
    // if (!user) {
    //   throw new HttpException('Oh no!', HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    return this.inventoriesService.create(createPostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result = await this.inventoriesService.remove(id);
    if (result.affected === 0) {
      throw new HttpException(
        `Inventory with id: ${id} can not be found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
