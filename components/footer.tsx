import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="container pb-10 ">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="">
            <Link className="font-bold text-3xl" href="/">
              Furni <span>.</span>
            </Link>
            <p className="text-gray-500 mt-4 text-sm">
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
              quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
              vulputate velit imperdiet dolor tempor tristique. Pellentesque
              habitant
            </p>
          </div>
          <div className="col-span-2">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-6 pt-12">
              <div className="">
                <ul className="flex flex-col gap-2">
                  <li>About us</li>
                  <li>About us</li>
                  <li>About us</li>
                  <li>About us</li>
                </ul>
              </div>
              <div className="">
                <ul className="flex flex-col gap-2">
                  <li>About us</li>
                  <li>About us</li>
                  <li>About us</li>
                </ul>
              </div>
              <div className="">
                <ul className="flex flex-col gap-2">
                  <li>About us</li>
                  <li>About us</li>
                  <li>About us</li>
                  <li>About us</li>
                  <li>About us</li>
                </ul>
              </div>
              <div className="">
                <ul className="flex flex-col gap-2">
                  <li>About us</li>
                  <li>About us</li>
                  <li>About us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
