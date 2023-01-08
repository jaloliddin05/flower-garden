import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LanguageDto } from '../../../infra/shared/dto';

class CreateCategory {
  @ApiProperty({
    description: 'Title',
    example: {
      uz: 'sport',
      ru: 'спорт',
    },
  })
  @IsNotEmpty()
  @IsObject()
  readonly title: LanguageDto;
}

export default CreateCategory;
