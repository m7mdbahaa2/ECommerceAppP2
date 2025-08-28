import { IBrand } from "./Brands.interface";
import { ICategory } from "./categories.interface";
import { IPagination } from "./pagination.interface";
import { ISubcategory } from "./Subcategory.interface";

export interface IProductInterface {
  results: number;
  metadata: IPagination;
  data: IProduct[];
}

export interface IProduct {
  sold: number;
  images: string[];
  subcategory: ISubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: string[];
}
