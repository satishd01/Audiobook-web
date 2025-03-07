import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LatestShows from "../../components/Podcasts/LatestShows/LatestShows";
import TopCreators from "../../components/Podcasts/TopCreators/TopCreators";
import AudiobookData from "../../components/singleaudiobook/audiobookdata/Audiobookdata";
import AudiobookImage from "../../components/SingleAudiobook/audiobookdata/Audiobookimgae/Audiobookimage";
import AudiobookInfo from "../../components/SingleAudiobook/audiobookdata/Audiobookinfo/Audiobookinfo";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";
import { fetchAudiobooks } from "../../apis/FetchAudiobooks";

const SingleAudiobook = () => {
  const [audiobook, setAudiobook] = useState(null);
  const [audiobooks, setAudiobooks] = useState(null);
  console.log(audiobook, "audiobook");

  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setAudiobook(location.state.audiobook);
    fetchAudiobooks(setAudiobooks);
  }, [location.state.audiobook]);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  return (
    audiobook && (
      <div>
        <Navbar />
        <div className="grid grid-cols-12">
          <SliderDiv />

          <div
            className={`${
              isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
            } col-span-12 text-white bg-black relative h-auto px-4 md:px-5 py-10`}>
            <div className="grid grid-cols-12 md:px-5 md:gap-10 gap-3">
              <AudiobookImage audiobook={audiobook} />
              <div className="col-span-12 md:col-span-7">
                <AudiobookInfo audiobook={audiobook} />
                <AudiobookData audiobook={audiobook} />
              </div>
            </div>
            {/* <div className="px-4">
              <TopCreators
                text={"Recommended Audiobooks"}
                isTwoRows={true}
                data={audiobooks}
                page="audiobook"
                contentType="audiobook"
              />
            </div> */}

<div>
              <LatestShows
                text={"Recomanded Audiobooks"}
                data={audiobooks}
                page="audiobook"
                contentType="audiobook"
              />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  );
};

export default SingleAudiobook;