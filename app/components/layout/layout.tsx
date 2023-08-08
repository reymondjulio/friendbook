import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col justify-between bg-slate-100 min-h-screen">
      <Header />
      <main className="container py-2 px-4 mx-auto max-w-6xl min-h-screen w-full">{children}</main>
      <Footer />
    </div>
  );
}
