import SuperheroList from "@components/SuperheroList";
import "./globals.css";
import { NavHeader } from "./components/Nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Superheroes App",
  description: "Superheroes List App",
};

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NavHeader />
        <main className="pt-28 overflow-y-auto flex-grow">
          <div>
            <SuperheroList />
          </div>
        </main>
      </body>
    </html>
  );
}
