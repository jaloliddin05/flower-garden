import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { ProductTagService } from '../product-tag/product-tag.service';
import {
  CreateProductDto,
  ProductTagProductDto,
  UpdateProductDto,
} from './dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productTagService: ProductTagService,
    private readonly connection: DataSource,
  ) {}

  async getAll() {
    const categories = await this.productRepository.getAll();
    return categories;
  }

  async getById(id: string) {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new HttpException('Product not Found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async delete(id: string) {
    const response = await this.productRepository.remove(id);
    return response;
  }

  async update(value: UpdateProductDto, id: string) {
    const response = await this.productRepository.update(value, id);
    return response;
  }

  async create(value: CreateProductDto) {
    const response = await this.productRepository.create(value);
    return response;
  }

  async addTagToProduct(value: ProductTagProductDto) {
    const product = await this.getById(value.productId);
    const tag = await this.productTagService.getById(value.tagId);

    product.productTags = product.productTags || [];
    product.productTags.push(tag);

    await this.connection.transaction(async (manager) => {
      await manager.save(product);
    });

    return product;
  }

  async removeTagFromProduct(value: ProductTagProductDto) {
    const product = await this.getById(value.productId);

    product.productTags = product.productTags || [];
    product.productTags = product.productTags.filter(
      (p) => p.id != value.tagId,
    );

    await this.connection.transaction(async (manager) => {
      await manager.save(product);
    });

    return product;
  }
}
