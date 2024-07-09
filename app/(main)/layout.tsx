import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import AuthProvider, { useAuth } from "../AppProvider";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "Furniture Web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className=" overflow-x-hidden">
          <AuthProvider>
            <Header />
            <main className="h-full">{children}</main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
