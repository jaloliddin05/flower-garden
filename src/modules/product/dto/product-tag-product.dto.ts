import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class ProductTagProductDto {
  @ApiProperty({
    description: 'Product Id',
    example: '2dc69470-c45d-4cee-bc68-132ed342fb3b',
  })
  @IsNotEmpty()
  @IsString()
  readonly productId: string;

  @ApiProperty({
    description: 'Tag Id',
    example: '2dc69470-c45d-4cee-bc68-132ed342fb3b',
  })
  @IsNotEmpty()
  @IsString()
  readonly tagId: string;
}

export default ProductTagProductDto;
