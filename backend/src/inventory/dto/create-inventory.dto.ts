import { IsOptional, IsString, IsUrl } from 'class-validator';
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
    description: 'Optional URL link to an image',
    example: 'https://example.com/image.png',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  image_url?: string;
}
