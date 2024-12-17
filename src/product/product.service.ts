import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Find all products
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Find one product by ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Check for duplicate product name
  private async isProductNameDuplicate(name: string): Promise<boolean> {
    const existingProduct = await this.productRepository.findOneBy({ name });
    return !!existingProduct; // Returns true if a product with the same name exists
  }

  // Create a new product
  async create(productData: Partial<Product>): Promise<Product> {
    // Check if the product name already exists
    const isDuplicate = await this.isProductNameDuplicate(productData.name);
    if (isDuplicate) {
      throw new ConflictException(`Product with name "${productData.name}" already exists`);
    }

    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  // Update an existing product
  async update(id: number, productData: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id); // Ensure the product exists

    const isDuplicate = await this.isProductNameDuplicate(productData.name);
    if (isDuplicate && product.name !== productData.name) {
      throw new ConflictException(`Product with name "${productData.name}" already exists`);
    }

    Object.assign(product, productData); // Merge changes
    return this.productRepository.save(product);
  }

  // Delete a product by ID
  async delete(id: number): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return true;
  }
}
