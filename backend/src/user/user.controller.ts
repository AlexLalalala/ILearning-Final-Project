import { Controller, Get, Post, Delete, Param, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import type { UUID } from 'node:crypto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ){}

  @Get()
  findAll(){
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID){
    return this.userService.findOne(id)
  }

  @Post()
  create(@Body(new ValidationPipe) createUserDto: CreateUserDto){
    // return {message: `User created with ${JSON.stringify(createUserDto)}`}
    return this.userService.create(createUserDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID){
    return this.userService.remove(id)
  }
}
