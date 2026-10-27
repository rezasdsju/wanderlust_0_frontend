import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Wanderlast | Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and create unforgettable memories with Wanderlast.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <Navbar />
        {children}
        <Footer></Footer>
        </body>
    </html>
  );
}
