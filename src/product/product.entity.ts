import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType() // Marks it as a GraphQL type
@Entity({ name: 'products' }) // Maps to the "products" table
export class Product {
  @Field(() => Int) // Expose as GraphQL field
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field()
  @Column()
  description: string;
}
