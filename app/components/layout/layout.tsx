import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ Children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main>{Children}</main>
      <Footer />
    </div>
  );
}
