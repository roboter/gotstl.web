export class Product {
  id!: number;
  name!: string;
  description!: string;
  image!: string;
  file!: string;
  code!: string;
  url!: string;
  author?: string;
  license?: string;
  tags?: string[];
}
