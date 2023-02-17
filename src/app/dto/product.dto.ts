import { IProduct } from '../contracts/product.contract';
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';



export class ProductDto implements Pick<IProduct, 'name'|'sku'|'price'|'currency'|'quantity'|'description'> {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  name: String;

  @IsNumber()
  sku: String;

  @IsNumber()
  price: Number;

  @IsOptional()
  currency?: String;

  @IsNumber()
  quantity: Number;
  
  @IsString()
  @MinLength(5)
  @MaxLength(400)
  description: String;


}

export class ProductUpdateDto{
  @IsNumber()
  sku: String;

  @IsNumber()
  price: Number;

  @IsBoolean()
  availability: boolean;

  @IsNumber()
  quantity: Number;
  
  @IsString()
  @MinLength(5)
  @MaxLength(400)
  description: String;

}
