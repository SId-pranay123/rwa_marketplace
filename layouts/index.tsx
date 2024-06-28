import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header01 from '../components/header/Header01';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nibiru | Template App",
  description: "Empty Nibi JS Template App",
  metadataBase: new URL("https://nibiru.fi/"),
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} min-h-screen flex flex-col p-4 `}>
      <Header01 />
      <main className="flex-grow">
          {children}
      </main>
    </div>
  );
}