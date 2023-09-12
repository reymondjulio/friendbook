import type { ReactNode } from "react";

import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-slate-100">
      <Header />
      <main className="container px-2 mx-auto max-w-6xl w-full">{children}</main>
      <Footer />
    </div>
  );
}
