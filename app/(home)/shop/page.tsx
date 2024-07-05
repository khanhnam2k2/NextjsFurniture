"use client";
import { Banner } from "@/components/banner";
import ProductList from "@/components/product/product-list";
import { getProductList } from "@/utils";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductList = async () => {
      const resp = await getProductList();
      setProducts(resp.data);
    };
    fetchProductList();
    setLoading(false);
  }, []);
  return (
    <div className="">
      <Banner title="Shop" />
      <div className="py-10 pb-20">
        {loading ? (
          <div className="flex justify-center items-center pt-10 ">
            <Loader />
          </div>
        ) : (
          <ProductList productList={products} />
        )}
      </div>
    </div>
  );
}
