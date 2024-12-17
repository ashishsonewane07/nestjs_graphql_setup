import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // Get all products
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // Get a product by ID
  @Query(() => Product)
  async product(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  // Create a new product
  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('price', { type: () => Int }) price: number,
    @Args('description') description: string,
  ): Promise<Product> {
    return this.productService.create({ name, price, description });
  }

  // Update a product by ID
  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('price', { type: () => Int, nullable: true }) price?: number,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<Product> {
    return this.productService.update(id, { name, price, description });
  }

  // Delete a product by ID
  @Mutation(() => Boolean)
  async deleteProduct(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.productService.delete(id);
  }
}
