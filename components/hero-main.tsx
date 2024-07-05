"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
type SideProps = {
  id: number;
  title: string;
  description: string;
  img: string;
};
const slides: SideProps[] = [
  {
    id: 1,
    title: "Discover Your New Space",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/images/hero.png",
  },
  {
    id: 2,
    title: "Discover Your New Space2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit1.",
    img: "/images/hero.png",
  },
  {
    id: 3,
    title: "Discover Your New Space3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    img: "/images/hero.png",
  },
];
const Title = ({ title }: { title: string }) => {
  const splitIndex = 15;
  let displayTitle;
  if (title.length > splitIndex) {
    const spaceIndex = title.indexOf(" ", splitIndex);
    if (spaceIndex !== -1) {
      displayTitle = (
        <>
          <span>{title.slice(0, spaceIndex)}</span>
          <br />
          <span>{title.slice(spaceIndex + 1)}</span>
        </>
      );
    }
  } else {
    displayTitle = title;
  }
  return (
    <h1 className="text-5xl font-bold leading-relaxed text-white">
      {displayTitle}
    </h1>
  );
};
export const Hero = () => {
  const [current, setCurrent] = useState<number>(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev == slides.length - 1 ? 0 : prev + 1));
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div className="bg-greenPrimary relative">
      <div
        className=" w-max flex transition-all ease-in-out duration-1000 overflow-hidden"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-screen  flex flex-col gap-16 md:flex-row pt-20 "
          >
            <div className="content-hero md:w-1/2 flex flex-col gap-6 text-center md:text-start md:ml-20 ">
              <Title title={slide.title} />
              <p className="text-gray-400 max-w-[400px] mx-auto md:mx-0 ">
                {slide.description}
              </p>
              <div className="flex items-center gap-2 md:justify-start justify-center  ">
                <Button className="bg-yellowSecondary rounded-full py-6 px-6 hover:bg-yellow-500 ">
                  Mua sắm ngay
                </Button>
                <Button
                  className=" border-white text-white rounded-full py-6 px-6"
                  variant="outline"
                >
                  Khám phá
                </Button>
              </div>
            </div>
            <div className="img-hero  md:w-1/2">
              <Image
                src="/images/hero.png"
                className="w-full"
                width={400}
                height={400}
                alt="hero"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 bottom-8 flex gap-4 m-auto z-100">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-3 h-3 rounded-full ring-1 bg-yellowSecondary cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-yellowSecondary rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
