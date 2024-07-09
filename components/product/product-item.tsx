"use client";
import { ProductProps } from "@/app/types";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { addToCart } from "@/utils";
import { useAuth } from "@/app/AppProvider";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Loader } from "lucide-react";

const ProductItem = ({ product }: { product: ProductProps }) => {
  const { user } = useAuth();

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddToCart = async (productId: string, price: string) => {
    setLoading(true);
    if (!user) {
      toast({
        title: "Lỗi",
        description: "Vui lòng đăng nhập để mua hàng",
        action: (
          <ToastAction altText="Try again">
            <Link href="/login">Đăng nhập</Link>
          </ToastAction>
        ),
      });
      setLoading(false);
      return;
    }
    const data = {
      userId: user._id,
      productId,
      price,
      quantity: 1,
    };
    try {
      const res = await addToCart(data);
      if (res.data.success) {
        toast({
          title: "Thành công",
          description: res.data.message,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mb-5 product-item group">
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
      </Link>
      <div className="text-center mt-4">
        <Button
          disabled={loading}
          onClick={() => handleAddToCart(product._id, product.price)}
          className="bg-black text-white rounded-full hover:bg-slate-500"
        >
          {loading ? <Loader /> : "Thêm vào giỏ hàng"}
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
