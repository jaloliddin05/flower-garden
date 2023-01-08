import { IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LanguageDto } from '../../../infra/shared/dto';

class UpdateCategory {
  @ApiProperty({
    description: 'Title',
    example: {
      uz: 'sport',
      ru: 'спорт',
    },
  })
  @IsOptional()
  @IsObject()
  readonly title: LanguageDto;
}

export default UpdateCategory;
