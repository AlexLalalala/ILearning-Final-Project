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
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import type { UUID } from 'node:crypto';
import { ParseUUIDPipe } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Messages } from 'src/constants/messages';

const object = 'User';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new HttpException(
        Messages.GENERAL_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    const response = await this.userService.findOne({ id });
    if (response) {
      return response;
    } else {
      throw new HttpException(
        Messages.notFound(object, id),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value')
      ) {
        throw new HttpException(
          Messages.alreadyExists(object, 'email'),
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
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseUUIDPipe) id: UUID) {
    const result = await this.userService.remove(id);
    if (result.affected === 0) {
      throw new HttpException(
        Messages.notFound(object, id),
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
