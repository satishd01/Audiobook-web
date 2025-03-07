import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Navbar from "../../components/Navbar/Navbar";
import OtherFooter from "../../components/OtherFooter/OtherFooter";

import GenreCard from "../../components/Search/Genres/GenreCard";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";
import genres from "../../utils/json/genres.json";

const GenresPage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12">
        {isUserViewOpen && <SliderDiv />}
        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative h-[100%] overflow-y-auto px-4 md:px-10 py-10`}>
          <div className="flex items-center justify-between md:pr-5">
            <p className="text-white text-2xl mb-4">Genres</p>
          </div>
          <div className="md:grid md:grid-cols-3 gap-6 overflow-x-auto flex w-full scrollbar-thin scrollbar-thumb-gray-400">
            {genres &&
              genres.map((genre) => (
                <div
                  key={genre._id}
                  className="min-w-[300px] flex-shrink-0 md:min-w-0 pb-3">
                  <GenreCard genre={genre} />
                </div>
              ))}
          </div>
          <OtherFooter />
        </div>
      </div>
    </div>
  );
};

export default GenresPage;
