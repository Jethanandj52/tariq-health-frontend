import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Home/Footer";

const Layout = () => {
  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <Outlet /> {/* 👈 Ye jaha page ka content aayega */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
