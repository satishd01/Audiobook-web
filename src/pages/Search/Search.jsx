import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import OtherFooter from "../../components/OtherFooter/OtherFooter";
import Genres from "../../components/Search/Genres/Genres";
import SearchNav from "../../components/Search/SearchNav/SearchNav";
import Suggestions from "../../components/Search/Suggestions/Suggestions";
import { resizeHandler, userSliderHandler } from "../../utils/constants";
import UserSlider from "../Home/features/UserSlider/UserSlider";
import TopCreators from "./../../components/Podcasts/TopCreators/TopCreators";
import SliderDiv from "../../components/SliderDiv/SliderDiv";

const Search = () => {
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const searchedText = useSelector((state) => state.search.searchedText);

  const dispatch = useDispatch();

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  return (
    <>
      <SearchNav />
      <div className="grid grid-cols-12">
        <SliderDiv />

        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative  h-auto px-4 md:px-7 py-3`}>
          <div className="mb-10">{}</div>
          {searchedText && searchedText.length > 0 ? (
            <Suggestions />
          ) : (
            <Genres />
          )}
          {/* <div className="md:mt-10 mt-4 md:px-5 md:mb-44 mb-10">
            <TopCreators
              isTwoRows={true}
              text={"Recommended Podcasts"}
              noSeeAll={true}
            />
          </div> */}
          {/* <OtherFooter /> */}
        </div>
      </div>
    </>
  );
};

export default Search;
