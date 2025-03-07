import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Loading = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 md:h-[100vh]">
        <div
          className={`col-span-12 text-white bg-black relative  h-auto px-4 md:px-10 py-10`}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Loading;
