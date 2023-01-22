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
import { ProductTag } from '../product-tag/product-tag.entity';
import { SubCategory } from '../sub-category/sub-category.entity';

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

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.category, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  subCategory: SubCategory;

  @ManyToMany(() => ProductTag, (productTag) => productTag.products, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  productTags: ProductTag[];
}
