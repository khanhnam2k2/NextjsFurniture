import { Banner } from "@/components/banner";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import React from "react";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <div>
      <Banner title="Liên hệ" />
      <div className="container  md:py-10 pb-20 md:px-36">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6">
          <div className="flex items-center space-x-3">
            <div className="bg-greenPrimary p-3 rounded-lg text-white">
              <MapPin className="" />
            </div>
            <p className="max-w-[200px] text-gray-500 text-sm">
              43 Raymouth Rd. Baltemoer, London 3910
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-greenPrimary p-3 rounded-lg text-white">
              <Mail />
            </div>
            <p className="max-w-[200px] text-gray-500 text-sm">
              info@yourdomain.com
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-greenPrimary p-3 rounded-lg text-white">
              <Phone />
            </div>
            <p className="max-w-[200px] text-gray-500 text-sm">
              +1 294 3925 3939
            </p>
          </div>
        </div>
        <form>
          <div className="grid  grid-rows-1 md:grid-rows-2 gap-6 mt-20">
            <Input className=" rounded-lg" type="text" placeholder="Họ" />
            <Input className=" rounded-lg" type="text" placeholder="Tên" />
            <Input
              className="col-span-2 rounded-lg"
              type="email"
              placeholder="Email"
            />
            <Textarea
              className="col-span-2 rounded-lg"
              placeholder="Nhập nội dung liên hệ."
            />
          </div>
          <div className="mt-6">
            <Button className="bg-black text-white rounded-full px-10 hover:bg-slate-600">
              Gửi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
