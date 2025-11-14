import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useRouteLoading } from "../hooks/useRouteLoading";
import Loading from "./Loading";

const MainLayOuts = () => {
  const loading = useRouteLoading(2000);
  return (
    <div>
      {loading && <Loading />}
      <header className="">
        <Navbar></Navbar>
      </header>
      <main className="flex flex-col min-h-screen px-4 py-8 container mx-auto">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayOuts;
