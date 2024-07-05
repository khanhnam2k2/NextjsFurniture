import "../globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["vietnamese"] });
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "../AppProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furniture Web",
};
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <div className="w-full  h-screen flex items-center justify-center">
            <div className="w-1/2 border-2  shadow-lg rounded-2xl p-6">
              {children}
            </div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
