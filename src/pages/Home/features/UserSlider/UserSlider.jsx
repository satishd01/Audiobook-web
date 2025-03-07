import React from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleAddContent } from "../../../../app/slices/addContentSlice";
import SmallUserCard from "../../../../components/UserSlider/SmallUserCard";
import UserFeaturesNav from "../../../../components/UserSlider/UserFeaturesNav";
import { logout } from "../../../../apis/logout";
import { useNavigate } from "react-router-dom";

const UserSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formOpenHandler = () => {
    dispatch(toggleAddContent(true));
  };

  const logoutHandler = async () => {
    await logout(navigate);
  };

  return (
    <>
      <div className="bg-[#131313] pb-5 z-50">
        <SmallUserCard />
        <div
          className="mx-5 px-3 bg-[#1F1F1F] shadow-lg rounded-md py-1 flex justify-between items-center hover:bg-gray-200 hover:rounded-lg hover:text-black cursor-pointer"
          onClick={formOpenHandler}>
          <AiFillPlusSquare className="text-xl" />
          <p className="md:text-sm text-xs whitespace-nowrap">
            Add Your Content
          </p>
        </div>
        <UserFeaturesNav />
        <div className=" md:mt-20 mt-10  text-center flex justify-center items-center">
          <div
            className="flex items-center gap-2 border border-white px-4 py-1 rounded-md cursor-pointer hover:bg-gray-200 hover:text-black"
            onClick={logoutHandler}>
            <IoLogOut className="text-xl" />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSlider;
