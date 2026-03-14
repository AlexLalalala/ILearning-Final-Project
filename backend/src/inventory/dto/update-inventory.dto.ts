import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  @ApiProperty({ description: 'Title', example: 'Candies' })
  title?: string | undefined;

  @ApiProperty({
    description: 'description',
    example: 'Tasty sweet candies',
  })
  description?: string | undefined;

  @ApiProperty({
    description: "Category's ID",
    example: 2,
  })
  category?: number | undefined;

  @ApiProperty({
    description: 'description',
    example: 'example2.test',
  })
  imageUrl?: string | undefined;

  @ApiProperty({
    description: "Array of users' UUID who have edit access",
    example: ['3d9156fb-4df1-4224-8e83-c8cd2aa25155'],
  })
  editAccess?: string[] | undefined;

  @ApiProperty({
    description: 'Version (for optimistic locking)',
    example: '111',
    required: true,
  })
  @IsNumber()
  version: number;
}
