import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";

import SearchNav from "../../components/Search/SearchNav/SearchNav";

import LibraryDetails from "../../components/Library/LibraryDetails/LibraryDetails";
import SuggestionCard from "../../components/Search/Suggestions/SuggestionCard";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import { resizeHandler, userSliderHandler } from "../../utils/constants";
import podcasts from "../../utils/json/podcasts.json";

const Library = () => {
  const dispatch = useDispatch();

  const searchedText = useSelector((state) => state.search.searchedText);

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  return (
    <div>
      <SearchNav isNoNavigation={true} />
      <div className="grid grid-cols-12">
        <SliderDiv />

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative  px-4 md:px-10 py-10 h-auto`}>
          {!searchedText && (
            <div className="w-[40%] py-3 flex items-center gap-5  bg-gradient-to-l from-black to-red-600 rounded-lg">
              <div className="p-4 bg-black inline-block mx-4 rounded-md border border-white">
                <FaHeart className="text-red-600 text-xl" />
              </div>
              <p className="text-xl">Liked Podcasts</p>
            </div>
          )}

          <div
            className={`md:grid ${
              searchedText ? "md:grid-cols-1" : "md:grid-cols-2"
            } mt-5`}>
            <div className="md:col-span-1">
              <LibraryDetails />
            </div>
            {/* {!searchedText && (
              <div className="md:col-span-1 md:mt-0  mt-4 w-full">
                <p className="mb-4 text-xl">recomanded</p>
                {podcasts.slice(0, 4).map((pod) => (
                  <div key={pod._id}>
                    <SuggestionCard podcast={pod} />
                  </div>
                ))}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
