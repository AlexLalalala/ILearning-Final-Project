import { ApiProperty } from '@nestjs/swagger';
import { IsString, Min } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  // @Min(3)
  name: string;
}
