import React from "react";

interface BannerProps {
  title?: string;
}
export const Banner = ({ title }: BannerProps) => {
  return (
    <div className="bg-greenPrimary flex items-center justify-center p-32 ">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">
        {title}
      </h1>
    </div>
  );
};
