export interface ProductProps {
  _id: string;
  name: string;
  imagesUrl: Array<string>;
  price: string;
  description: string;
  materials: string;
  rating: string;
  size: string;
  category: CategoryProps;
}
export interface CategoryProps {
  _id: string;
  name: string;
  icon: string;
  description: string;
}
