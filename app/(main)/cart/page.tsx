"use client";
import { useAuth } from "@/app/AppProvider";
import { ProductInCartProps } from "@/app/types";
import { Banner } from "@/components/banner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils";
import { deleteItemInCart, getCartList, updateQuantityInCart } from "@/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cartList, setCartList] = useState<ProductInCartProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchCartList = async () => {
        // setLoading(true);
        try {
          const resp = await getCartList(user?._id);

          setCartList(resp.data.items);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchCartList();
    }
  }, [user]);

  useEffect(() => {
    const totals = cartList.reduce(
      (total: number, item: ProductInCartProps) => {
        return total + item.quantity * item.price;
      },
      0
    );
    setTotalPrice(totals);
  }, [cartList]);

  const handleDeleteItem = async (itemId: string) => {
    try {
      if (user) {
        const resp = await deleteItemInCart(user?._id, itemId);
        if (resp.status === 200 && resp.data.success) {
          toast({
            title: "Thành công",
            description: resp.data.message,
          });

          setCartList(
            cartList.filter((item: ProductInCartProps) => item._id !== itemId)
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const incrementQuantity = (itemId: string, quantity: number) => {
    const newQuantity = quantity + 1;
    updateQuantity(itemId, newQuantity);
  };

  const decrementQuantity = (itemId: string, quantity: number) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateQuantity(itemId, newQuantity);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      if (user) {
        const resp = await updateQuantityInCart(user._id, itemId, newQuantity);
        if (resp.status === 200 && resp.data.success) {
          toast({
            title: "Thành công",
            description: resp.data.message,
          });
          const updatedCart = cartList.map((item: ProductInCartProps) => {
            if (item._id === itemId) {
              return { ...item, quantity: newQuantity };
            } else {
              return item;
            }
          });
          setCartList(updatedCart);
        }
      }
    } catch (error) {}
  };

  return (
    <div>
      <Banner title="Giỏ hàng" />

      {loading ? (
        <div className="pt-20 flex items-center justify-center">
          <Loader />
        </div>
      ) : cartList.length > 0 ? (
        <div className="p-20 ">
          <div className="relative overflow-x-auto  h-[calc(100vh-96px)]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Ảnh
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tên sản phẩm
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giá
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số lượng
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Xóa
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartList?.map((item: ProductInCartProps) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                          "/images/" +
                          item.product.imagesUrl[0]
                        }
                        width={300}
                        height={300}
                        alt="product"
                        className="w-52 h-auto object-cover"
                      />
                    </th>
                    <td className="px-6 py-4">{item.product.name}</td>
                    <td className="px-6 py-4">
                      {formatCurrency(item.product.price)}đ
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <Button
                            className="text-2xl font-medium"
                            onClick={() =>
                              decrementQuantity(item._id, item.quantity)
                            }
                          >
                            -
                          </Button>
                        </div>
                        {item.quantity}
                        <div className="">
                          <Button
                            className="text-2xl font-medium"
                            onClick={() =>
                              incrementQuantity(item._id, item.quantity)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Button onClick={() => handleDeleteItem(item._id)}>
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <div className="flex items-center flex-col md:flex-row justify-between px-8 flex-wrap">
              <div className="w-1/2">
                <Link href="/shop">
                  <Button className="bg-black text-white rounded-full px-4 py-6 hover:bg-slate-800">
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </div>
              <div className=" md:w-1/3 w-full flex flex-col items-center gap-10 p-4 ">
                <h2 className="font-medium text-2xl self-start">Tổng tiền</h2>
                <div className="flex items-center justify-between w-full">
                  <span>Thanh toán</span>
                  <span>{formatCurrency(totalPrice)} đ</span>
                </div>
                <Button className="bg-black text-white rounded-full px-4 py-6 w-full hover:bg-slate-800">
                  Tiến hành đặt hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-20 flex items-center justify-center ">
          <h1 className="font-semibold text-2xl">Giỏ hàng trống</h1>
        </div>
      )}
    </div>
  );
};

export default CartPage;
