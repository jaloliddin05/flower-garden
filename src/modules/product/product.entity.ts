import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { LanguageDto } from '../../infra/shared/dto';

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
}
