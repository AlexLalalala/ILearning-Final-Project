import { IsOptional, IsString, IsUrl, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty({
    description: "Inventories's title",
    example: 'Ice creams',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "Inventory's description",
    example: 'Inventory for all types of ice cream we have in the menu',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Inventory's Category ID",
    example: '2',
    required: false,
  })
  @IsOptional()
  @IsInt()
  category?: number;

  @ApiProperty({
    description: 'Optional URL link to an image',
    example: 'https://example.com/image.png',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
