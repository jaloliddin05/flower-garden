import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LanguageDto } from '../../infra/shared/dto';
import { Category } from '../category/category.entity';

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
}
