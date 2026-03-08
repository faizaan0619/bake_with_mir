import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bake With Mir | Fresh Bakery & Custom Cakes in Bandipora",
  description:
    "Bake With Mir - Your premium bakery in Nusso Bandipora. Fresh cakes, pastries, cookies, bread & custom cakes baked with love. Order online or visit us!",
  keywords:
    "bakery, cakes, custom cakes, pastries, cookies, bread, Bandipora, Nusso, Bake With Mir",
  openGraph: {
    title: "Bake With Mir | Fresh Bakery & Custom Cakes",
    description:
      "Premium bakery in Nusso Bandipora. Fresh cakes, pastries & more!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased bg-cream text-rich-chocolate">
        <Navbar />
        <main className="min-h-screen pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
