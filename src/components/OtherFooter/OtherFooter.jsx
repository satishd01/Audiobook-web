import React from "react";
import ellipse from "../../images/Ellipse.png";

const OtherFooter = () => {
  return (
    <>
      <div className="mx-1 md:mx-5 pt-8 grid grid-cols-12 md:grid-cols-12 gap-y-4 text-center md:text-left">
        <div className="col-span-6 md:col-span-2 flex flex-col space-y-2">
          <p className="text-lg font-semibold">Navigation</p>
          <p>Home</p>
          <p>Articles</p>
          <p>Blogs</p>
        </div>
        <div className="col-span-6 md:col-span-2  flex-col space-y-2 flex justify-center items-center">
          <p className="text-lg font-semibold">Our Social</p>
          <p>Instagram</p>
          <p>Spotify</p>
          <p>Facebook</p>
        </div>
        <div className="relative md:col-span-4 col-span-12 flex justify-center items-center">
          <img alt="ellipse" src={ellipse} className="h-16" />
          <p className="absolute text-2xl md:top-10 top-2">Podcaster</p>
        </div>

        <div className="col-span-6 md:col-span-2 flex flex-col space-y-2">
          <p className="text-lg font-semibold">Useful Links</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Support</p>
        </div>

        <div className="col-span-6 md:col-span-2  flex flex-col items-center space-y-2">
          <p className="text-lg font-semibold">Information</p>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Blogs</p>
        </div>
      </div>
    </>
  );
};

export default OtherFooter;
