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

export type ProductInCartProps = {
  _id: string;
  price: number;
  quantity: number;
} & { product: ProductProps };

export interface CategoryProps {
  _id: string;
  name: string;
  icon: string;
  description: string;
}

export type AuthContextType = {
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; msg: string }>;
  logout: () => void;
  loading: boolean;
} & { user: User | null };

export type User = {
  _id: string;
  username: string;
  email: string;
  role: number;
};

export interface LogoutResponseProps {
  success: boolean;
  message: string;
}
