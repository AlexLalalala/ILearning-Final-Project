import { Controller, Get, Post, Delete, Param, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

  @Get()
  findAll(){
    return {message: 'All users returned'}
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return {message: `User with id:${id} returned`}
  }

  @Post()
  create(@Body(new ValidationPipe) createUserDto: CreateUserDto){
    return {message: `User created with ${JSON.stringify(createUserDto)}`}
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return {message: `User with id:${id} deleted`}
  }
}
