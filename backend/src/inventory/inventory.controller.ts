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
  UseGuards,
} from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InventoryService } from './inventory.service';
import { QueryFailedError, Repository } from 'typeorm';
import type { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import type { UUID } from 'crypto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  async create(@Body(new ValidationPipe()) createPostDto: CreateInventoryDto) {
    return this.inventoriesService.create(createPostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
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
