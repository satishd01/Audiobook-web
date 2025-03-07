import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";

const UploadContent = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        dispatch(toggleSlider(false));
      }
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "formOverlay") {
      onClose();
    }
  };

  return (
    <div
      id="formOverlay"
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={handleOutsideClick}>
      <div
        className="bg-[#151515] text-white rounded-lg shadow-lg p-6 w-[90%] md:h-auto  md:w-[400px]"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="text-center text-xl font-semibold mb-4">
          Upload Podcast
        </h2>
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="mt-2 block w-full p-2 mb-4 bg-black text-white rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            className="mt-2 block w-full p-2 mb-4 bg-black text-white rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
          <label htmlFor="number">Mobile Number</label>

          <input
            type="text"
            id="number"
            className="mt-2 block w-full p-2 mb-4 bg-black text-white rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
          <label htmlFor="genre">Genre</label>

          <input
            type="text"
            id="genre"
            className="mt-2 block w-full p-2 mb-4 bg-black text-white rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
          <button
            type="submit"
            className="block w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition">
            Submit
          </button>
        </form>
        <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
          <hr className="flex-1 border-gray-600" />
          <span className="mx-2">Or</span>
          <hr className="flex-1 border-gray-600" />
        </div>
        <div className="text-start mt-4">
          <p className="text-white mb-2 text-sm">Admin Contact Number</p>
          <button className="bg-white text-black py-1 px-6 rounded font-semibold hover:bg-gray-200 transition">
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadContent;
