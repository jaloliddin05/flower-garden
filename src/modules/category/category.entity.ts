import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { LanguageDto } from '../../infra/shared/dto';
import { Product } from '../product/product.entity';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json')
  title: LanguageDto;

  @OneToMany(()=>Product, product=>product.category)
  products:Product[]
}
