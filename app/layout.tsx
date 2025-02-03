import type { Metadata } from "next";
import "./globals.css";
import { NavHeader } from "./components/Nav";

export const metadata: Metadata = {
  title: "Superheroes App",
  description: "Superheroes List App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NavHeader />
          <main className="pt-28 overflow-y-auto flex-grow">
            {children}
          </main>
      </body>
    </html>
  );
}
