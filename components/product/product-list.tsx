import React from "react";
import { ProductProps } from "@/app/types";
import ProductItem from "./product-item";
interface ProductListProps {
  productList: ProductProps[];
}
const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  return (
    <div className="container py-10">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {productList?.map((product: ProductProps) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
