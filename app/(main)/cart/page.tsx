"use client";
import { useAuth } from "@/app/AppProvider";
import { Banner } from "@/components/banner";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { getCartList } from "@/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const { user } = useAuth();
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartList = async () => {
      try {
        const resp = await getCartList(user?._id);
        const totals = resp.data?.items?.reduce((total: any, item: any) => {
          return total + item.quantity * item.price;
        }, 0);

        setCartList(resp.data.items);
        setTotalPrice(totals);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchCartList();
    } else {
      setLoading(false);
    }
  }, [user]);
  return (
    <div>
      <Banner title="Giỏ hàng" />
      {loading ? (
        <div className="pt-20 flex items-center justify-center">
          <Loader />
        </div>
      ) : cartList.length ? (
        <div className="p-20 ">
          <div className="relative overflow-x-auto h-[calc(100vh-96px)]">
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
                {cartList?.map((item: any) => (
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
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">X</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <div className="flex items-center flex-col md:flex-row justify-between px-8 flex-wrap">
              <div className="w-1/2">
                <Button className="bg-black text-white rounded-full px-4 py-6 hover:bg-slate-800">
                  Tiếp tục mua sắm
                </Button>
              </div>
              <div className=" md:w-1/3 w-full flex flex-col items-center gap-10 p-4 ">
                <h2 className="font-medium text-2xl self-start">Tổng tiền</h2>
                <div className="flex items-center justify-between w-full">
                  <span>Thanh toán</span>
                  <span>{formatCurrency(totalPrice)}d</span>
                </div>
                <Button className="bg-black text-white rounded-full px-4 py-6 w-full hover:bg-slate-800">
                  Tiến hành đặt hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-20 flex items-center justify-center">
          <h1 className="font-semibold text-2xl">Giỏ hàng trống</h1>
        </div>
      )}
    </div>
  );
};

export default CartPage;
