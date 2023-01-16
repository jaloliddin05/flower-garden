import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { LanguageDto } from '../../infra/shared/dto';
import { Category } from '../category/category.entity';
import { ProductTag } from '../product-tag/product-tag.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json')
  title: LanguageDto;

  @Column()
  price: string;

  @Column('simple-json')
  about: LanguageDto;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  category: Category;

  @ManyToMany(() => ProductTag, (productTag) => productTag.products, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  productTags: ProductTag[];
}
