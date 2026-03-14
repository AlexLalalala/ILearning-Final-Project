import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto';
import { ApiProperty } from '@nestjs/swagger';

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
}
