import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSlider } from "../../../app/slices/sliderSlice";
import { setSearchedText } from "../../../app/slices/searchSlice";
import Notification from "../../Notification/Notification";

const SearchNav = ({ isNoNavigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slider = useSelector((state) => state.slider.isSliderOpen);

  const handleIsUserViewOpen = () => {
    dispatch(toggleSlider(slider ? false : true));
  };

  useEffect(() => {
    dispatch(setSearchedText(text));
  }, [text, dispatch]);

  const handleNavigation = () => {
    if (!isNoNavigation) {
      navigate("/search");
    }
  };

  // Adjust isMenuOpen based on screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Reset menu state for desktop
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="grid grid-cols-12 text-white select-none">
      <div className="md:col-span-2 col-span-3 md:bg-[#131313] bg-[#100E0E] flex px-8 py-3 text-2xl items-center cursor-pointer">
        <p onClick={handleIsUserViewOpen} className="font-semibold ">
          Logo
        </p>
      </div>

      <div className="md:col-span-10 col-span-9 md:hidden bg-[#100E0E] flex justify-end items-center px-4 py-3">
        {isMenuOpen ? (
          <RxCross2
            className="text-3xl cursor-pointer transform transition-all duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(false)}
          />
        ) : (
          <HiMenu
            className="text-3xl cursor-pointer transform transition-all duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`relative ${
          isMenuOpen ? "block md:flex" : "hidden md:flex"
        } md:col-span-10 col-span-12 bg-[#100E0E]  flex justify-center items-center gap-16 px-10 py-2`}>
        <div className="md:col-span-4 flex items-center gap-10 justify-between md:w-6/12 w-11/12">
          <div
            className="bg-black py-2 w-full md:mt-0 mt-3 px-4 rounded-3xl flex justify-between items-center cursor-pointer"
            onClick={handleNavigation}>
            <input
              type="text"
              placeholder="Search"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-white px-3 bg-transparent outline-none w-full"
            />
            <CiSearch className="text-xl " />
          </div>

          <Notification />
        </div>
      </div>
    </nav>
  );
};

export default SearchNav;
