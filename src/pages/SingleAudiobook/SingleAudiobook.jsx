import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LatestShows from "../../components/Podcasts/LatestShows/LatestShows";
import TopCreators from "../../components/Podcasts/TopCreators/TopCreators";
import AudiobookData from "../../components/singleaudiobook/audiobookdata/Audiobookdata";
import AudiobookImage from "../../components/singleaudiobook/audiobookdata/Audiobookimgae/Audiobookimage";
import AudiobookInfo from "../../components/singleaudiobook/audiobookdata/Audiobookinfo/Audiobookinfo";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import { resizeHandler, scrollToTop, userSliderHandler } from "../../utils/constants";

const SingleAudiobook = () => {
  const { audiobookId } = useParams(); // Get the audiobook ID from URL params
  const [audiobook, setAudiobook] = useState(null);
  console.log(audiobook,"audiobook");
  const [relatedEpisodes, setRelatedEpisodes] = useState([]);
  const [recommendedAudiobooks, setRecommendedAudiobooks] = useState([]);
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchAudiobookData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://audiobook.shellcode.cloud/api/audiobook/${audiobookId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch audiobook: ${res.status}`);
        }

        const data = await res.json();
        setAudiobook(data.audiobook);
        setRelatedEpisodes(data.relatedEpisodes);
        setRecommendedAudiobooks(data.recommendedAudiobooks);
      } catch (error) {
        console.error(`Failed to fetch audiobook: ${error.message}`);
      }
    };

    fetchAudiobookData();
  }, [audiobookId]);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  if (!audiobook) {
    return <div>Loading...</div>;
  }

  return (
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
          <div>
            <LatestShows
              text={"Recommended Audiobooks"}
              data={recommendedAudiobooks}
              page="audiobook"
              contentType="audiobook"
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SingleAudiobook;