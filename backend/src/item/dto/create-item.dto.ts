import {
  IsString,
  IsNumber,
  Length,
  Min,
  IsOptional,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  //  === SHORT TEXT FIELD ===
  @ApiProperty({
    description: 'Short text field 1',
    example: 'Title',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  short_text1: string;

  @ApiProperty({
    description: 'Short text field 2',
    example: 'Title',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  short_text2: string;

  @ApiProperty({
    description: 'Short text field 3',
    example: 'Title',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  short_text3: string;

  //  === LONG TEXT FIELD ===
  @ApiProperty({
    description: 'Long text field 1',
    example: 'Description',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  long_text1?: string;

  @ApiProperty({
    description: 'Long text field 2',
    example: 'Description',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  long_text2?: string;

  @ApiProperty({
    description: 'Long text field 3',
    example: 'Description',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  long_text3?: string;

  // === NUMBER FIELD ===
  @ApiProperty({
    description: 'Number field 1',
    example: '12',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  number1?: number;

  @ApiProperty({
    description: 'Number field 2',
    example: '12',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  number2?: number;

  @ApiProperty({
    description: 'Number field 3',
    example: '12',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  number3?: number;

  // === BOOLEANS FIELD ===
  @ApiProperty({
    description: 'Boolean field 1',
    example: 'false',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  bool1?: boolean;

  @ApiProperty({
    description: 'Boolean field 2',
    example: 'false',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  bool2?: boolean;

  @ApiProperty({
    description: 'Boolean field 3',
    example: 'false',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  bool3?: boolean;
}
