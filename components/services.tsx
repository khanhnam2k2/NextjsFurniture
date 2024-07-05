import { Aperture, Car, RefreshCcwDot, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <div className="container my-20">
      <div className="flex items-center justify-between flex-col md:flex-row gap-8">
        <div className=" w-full md:w-1/2 ">
          <h2 className="font-semibold text-3xl mb-2">Why Choose Us</h2>
          <p className="text-sm text-gray-500 max-w-full">
            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
            velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
          </p>
          <div className="grid grid-cols-2 mt-6 gap-6">
            <div className="flex flex-col gap-2">
              <Car size={36} />
              <h3 className="font-semibold text-base">Fast & Free Shipping</h3>
              <p className="text-sm text-gray-500 ">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <ShoppingBag size={36} />
              <h3 className="font-semibold text-base">Easy to Shop</h3>
              <p className="text-sm text-gray-500 ">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Aperture size={36} />
              <h3 className="font-semibold text-base">24/7 Support</h3>
              <p className="text-sm text-gray-500 ">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <RefreshCcwDot size={36} />
              <h3 className="font-semibold text-base">Hassle Free Returns</h3>
              <p className="text-sm text-gray-500 ">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate.
              </p>
            </div>
          </div>
        </div>
        <div className="img w-full md:w-1/3 relative">
          <div className="absolute -top-[60px] -left-[90px]  z-0 hidden md:block">
            <Image
              src="/images/dots-yellow.svg"
              width={200}
              height={200}
              alt="dot"
            />
          </div>
          <div className="relative z-10">
            <Image
              src="/images/product2.png"
              width={400}
              height={400}
              className="w-full h-auto rounded-xl"
              alt="img-service"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
