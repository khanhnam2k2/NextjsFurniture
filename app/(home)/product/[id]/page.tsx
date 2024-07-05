import { ProductProps } from "@/app/types";
import { Banner } from "@/components/banner";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getProductById(productId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/product/${productId}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product: ProductProps = await getProductById(params.id);

  return (
    <div className="">
      <Banner title={product?.name} />
      <div className="container mt-10 mb-10">
        <div className="flex  items-center md:justify-between md:flex-row flex-col">
          <div className="md:w-1/2 w-full">
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                {Object.values(product?.imagesUrl ?? []).map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/images/${img}`}
                        width={400}
                        height={400}
                        alt="img-detail"
                        // className="w-[500px] max-w-[600px] h-[400px]"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="md:w-1/2 w-full flex flex-col gap-6 pt-4">
            <h3 className="font-semibold text-3xl">{product?.name}</h3>
            <p className="font-semibold text-lg">
              {product?.price !== undefined && formatCurrency(product?.price)} đ
            </p>
            <div className="flex items-center space-x-3">
              <span className="font-semibold">Vật liệu:</span>
              <p className="border p-1 text-sm">{product?.materials}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold">Kích thước:</span>
              <p className="border p-1 text-sm">{product?.size}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold">Danh mục:</span>
              <p className="text-sm">{product?.category.name}</p>
            </div>
            <div className="flex items-center space-x-4 w-1/2">
              <Button className="bg-greenPrimary rounded-full hover:bg-green-900 flex-1">
                <span className="text-white">Mua ngay</span>
              </Button>
              <Button className="hover:-translate-y-1 transition-all ease-linear">
                <ShoppingBag size={30} />
              </Button>
            </div>
            <div className="">
              <Tabs defaultValue="description" className="w-[400px]">
                <TabsList className="p-0 space-x-4">
                  <TabsTrigger className="p-0 text-base" value="description">
                    Mô tả
                  </TabsTrigger>
                  <TabsTrigger className="text-base" value="rating">
                    Đánh giá
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                  <p className="text-sm">{product?.description}</p>
                </TabsContent>
                <TabsContent value="rating">
                  <p>Rating...</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
