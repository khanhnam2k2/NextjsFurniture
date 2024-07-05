import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { ProductProps } from "@/app/types";
interface ProductListProps {
  productList: ProductProps[];
}
const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  return (
    <div className="container py-10">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {productList?.map((product: any) => {
          return (
            <div key={product._id} className="mb-5 product-item group">
              <Link href={`/product/${product._id}`}>
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                    "/images/" +
                    product.imagesUrl[0]
                  }
                  width={300}
                  height={300}
                  alt="product"
                  className="w-auto h-auto transform transition-transform duration-300 group-hover:-translate-y-4"
                />
                <div className="flex items-center justify-between px-8">
                  <h3 className="text-center">{product.name}</h3>
                  <p className="text-center font-bold">
                    {formatCurrency(product.price)} đ
                  </p>
                </div>
                <div className="text-center mt-4">
                  <Button className="bg-black text-white rounded-full hover:bg-slate-500">
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
