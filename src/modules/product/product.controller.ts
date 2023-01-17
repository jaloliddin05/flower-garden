import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import {
  CreateProductDto,
  ProductTagProductDto,
  UpdateProductDto,
} from './dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/id')
  @ApiOperation({ summary: 'Method: returns product by id' })
  @ApiOkResponse({
    description: 'The product was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all products' })
  @ApiOkResponse({
    description: 'The products were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getData() {
    try {
      return await this.productService.getAll();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new product' })
  @ApiCreatedResponse({
    description: 'The product was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() productData: CreateProductDto) {
    try {
      return await this.productService.create(productData);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/product-tag-product')
  @ApiOperation({ summary: 'Method: adds tag to product' })
  @ApiCreatedResponse({
    description: 'The tag was applied to product successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async addTagToProduct(@Body() data: ProductTagProductDto) {
    try {
      return await this.productService.addTagToProduct(data);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating product' })
  @ApiOkResponse({
    description: 'Product was changed',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() userData: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    try {
      return await this.productService.update(userData, id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting product' })
  @ApiOkResponse({
    description: 'Product was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    try {
      return await this.productService.delete(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/delete/tag')
  @ApiOperation({ summary: 'Method: deleting tag from product' })
  @ApiOkResponse({
    description: 'Product tag was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTag(@Body() data: ProductTagProductDto) {
    try {
      return await this.productService.removeTagFromProduct(data);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
