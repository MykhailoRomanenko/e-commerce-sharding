import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  ProductFindAllParams,
  UpdateSuppliersDto,
} from './dto/dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query() params: ProductFindAllParams) {
    return this.productService.findAll(params);
  }

  @Patch()
  updateSuppliers(@Body() dto: UpdateSuppliersDto) {
    return this.productService.update(dto);
  }
}
