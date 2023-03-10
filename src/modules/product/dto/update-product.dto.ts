import { IsOptional, IsString, IsObject, isObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { LanguageDto } from '../../../infra/shared/dto';

function parseTextToObject(name: string, value?: string) {
  const obj = value ? JSON.parse(value) : '';
  if (!isObject(obj)) {
    throw new BadRequestException(`${name} should be an object.`);
  }
  return obj;
}

class UpdateProductDto {
  @ApiProperty({
    description: 'Title',
    example: {
      uz: 'Atirgul',
      ru: 'Роза',
    },
  })
  @IsOptional()
  @IsObject()
  @Transform(({ value }: { value: string }) =>
    parseTextToObject('title', value),
  )
  readonly title: LanguageDto;

  @ApiProperty({
    description: 'Price',
    example: '120000',
  })
  @IsOptional()
  @IsString()
  readonly price: string;

  @ApiProperty({
    description: 'About',
    example: {
      uz: 'Bu gul ...',
      ru: 'это цветок ...',
    },
  })
  @IsOptional()
  @IsObject()
  @Transform(({ value }: { value: string }) =>
    parseTextToObject('about', value),
  )
  readonly about: LanguageDto;

  @ApiProperty({
    description: 'Category Id',
    example: '2dc69470-c45d-4cee-bc68-132ed342fb3b',
  })
  @IsOptional()
  @IsString()
  subCategory: string;
}

export default UpdateProductDto;
