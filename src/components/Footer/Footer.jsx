import React from "react";
import image from "../../images/footerImage.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleAddContent } from "../../app/slices/addContentSlice";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formOpenHandler = () => {
    dispatch(toggleAddContent(true));
  };
  return (
    <>
      <div>
        <img alt="footer" src={image} className="w-full mt-20" />
      </div>
      <div className="mx-1 md:mx-16 pt-8 grid grid-cols-12 md:grid-cols-12 gap-y-4 text-center md:text-left">
        <div className="col-span-12 md:col-span-3">
          <p className="text-3xl">LOGp</p>
        </div>

        <div className="col-span-4 md:col-span-2 flex flex-col space-y-2">
          <p className="text-lg font-semibold">Our Social</p>
          <p>Instagram</p>
          <p>Spotify</p>
          <p>Facebook</p>
        </div>

        <div className="col-span-4 md:col-span-2 flex flex-col space-y-2">
          <p className="text-lg font-semibold">Useful Links</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Support</p>
        </div>

        <div
          className="col-span-4 md:col-span-2  flex flex-col items-center space-y-2 cursor-pointer"
          onClick={() => navigate("/subscription")}>
          <p className="text-lg font-semibold">Subscription</p>
          <p>Basic</p>
          <p>Premium</p>
          <p>Platinum</p>
        </div>

        <div className="col-span-12 md:col-span-3 flex flex-col items-center md:items-start">
          <p className="text-lg">Want to partner with us?</p>
          <button
            className="px-4 py-2 bg-gray-50 text-black rounded-md mt-4"
            onClick={formOpenHandler}>
            List your content
          </button>
        </div>
      </div>
      <div className="md:mx-[70px] mt-5">
        <hr className="bg-gray-200 h-[1px] " />
        <p className="mt-5">&copy;2024 all rights reserved</p>
      </div>
    </>
  );
};

export default Footer;
