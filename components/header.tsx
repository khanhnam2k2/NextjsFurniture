"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  Loader,
  LogOut,
  Menu,
  ShoppingCart,
  User,
} from "lucide-react";
import { useAuth } from "@/app/AppProvider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const Header = () => {
  const { user, logout, loading } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-greenPrimary pt-4 ">
      <div className="container px-20">
        <header className=" flex md:flex-row items-start justify-start flex-col md:justify-between md:items-center text-white">
          <div className="md:w-auto w-full flex items-center justify-between">
            <Link href="/" className="font-bold text-3xl">
              Furni <span>.</span>
            </Link>
            <Button
              className="block md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <Menu />
            </Button>
          </div>
          <nav
            className={`w-full md:block md:flex-1 ${
              !isMenuOpen ? "hidden" : "block"
            } transition-all ease-linear duration-1000`}
          >
            <ul className="flex mt-4 md:items-center md:flex-row flex-col gap-4 md:gap-10 justify-end font-normal mr-20">
              <li>
                <Link
                  className="hover:border-b-4 pb-1 border-yellow-400"
                  href="/shop"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  className="hover:border-b-4 pb-1 border-yellow-400"
                  href="/dashboard"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  className="hover:border-b-4 pb-1 border-yellow-400"
                  href="/contact"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                {loading ? (
                  <Loader />
                ) : user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="outline-none p-0">
                        Xin chào, {user} <ChevronDown className="pt-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 text-black bg-white">
                      <DropdownMenuItem>
                        <LogOut className="h-4 w-4" />
                        <Button onClick={() => logout()}>Đăng xuất</Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <User />
                  </Link>
                )}
              </li>

              <li>
                <Link href="/">
                  <ShoppingCart />
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
};
