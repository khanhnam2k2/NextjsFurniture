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

export type AuthContextType = {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string;
  loading: boolean;
} & { user: User };

export type User = {
  _id: string;
  username: string;
  email: string;
  role: number;
};
