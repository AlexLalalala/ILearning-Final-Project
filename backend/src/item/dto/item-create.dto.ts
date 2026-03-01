import { IsString, IsNumber, Length, Min } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateItemDto{
  @ApiProperty({
    description: "Item's title",
    example: "Ice cream"
  })
  @IsString()
  @Length(1,128)
  title: string

  @ApiProperty({
    description: "Item's description",
    example: "Tasty ice cream"
  })
  @IsString()
  @Length(0, 256)
  description: string

  @ApiProperty({
    description: "Item's price",
    example: 10
  })
  @IsNumber()
  @Min(0)
  price: number
}