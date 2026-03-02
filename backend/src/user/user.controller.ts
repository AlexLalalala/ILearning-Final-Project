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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import type { UUID } from 'node:crypto';
import { ParseUUIDPipe } from '@nestjs/common';
import { IsNull, QueryFailedError } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    const response = await this.userService.findOne(id);
    if (response) {
      return response;
    } else {
      throw new HttpException(
        `User with id: ${id} can not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          `User with this id already exist`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          `Internal Server Error`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: UUID) {
    const result = await this.userService.remove(id);
    if (result.affected === 0) {
      throw new HttpException(
        `User with id: ${id} can not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
