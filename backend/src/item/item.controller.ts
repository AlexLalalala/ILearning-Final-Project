import { Controller, Get, Param, Body, Post, Delete, ValidationPipe } from '@nestjs/common';
import { CreateItemDto } from './dto/item-create.dto';


@Controller('item')
export class ItemController {
  // constructor(
  //   private createItemDto: 
  // ){}

  @Get()
  findAll(){
    return {message: "All items returned"}
  }

  @Get(':id')
  findOne(@Param('id') id:string){
    return {message: `An item with id:${id} returned`}
  }

  @Post()
  create(@Body(new ValidationPipe) createItemDto: CreateItemDto){
    return {message: `New item was created with ${JSON.stringify(createItemDto)}`}
  }

  @Delete(':id')
  remove(@Param('id') id:string){
    return {message: `Item with ${id} is removed`}
  }
}
