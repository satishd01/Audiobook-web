import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LatestShows from "../../components/Podcasts/LatestShows/LatestShows";
import TopCreators from "../../components/Podcasts/TopCreators/TopCreators";
import PodcastData from "../../components/SinglePodcast/PodcastData/PodcastData";
import PodcastImage from "../../components/SinglePodcast/PodcastImage/PodcastImage";
import PodcastInfo from "../../components/SinglePodcast/PodcastInfo/PodcastInfo";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import { resizeHandler, scrollToTop, userSliderHandler } from "../../utils/constants";

const SinglePodcast = () => {
  const { podId } = useParams(); // Get the podcast ID from URL params
  const [podcast, setPodcast] = useState(null);
  const [relatedEpisodes, setRelatedEpisodes] = useState([]);
  const [recommendedPodcasts, setRecommendedPodcasts] = useState([]);
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchPodcastData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://audiobook.shellcode.cloud/api/admin/podcasts/${podId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch podcast: ${res.status}`);
        }

        const data = await res.json();
        console.log(data); // Log the entire response data
        setPodcast(data.podcast);
        setRelatedEpisodes(data.relatedEpisodes);
        setRecommendedPodcasts(data.recommendedPodcasts);
      } catch (error) {
        console.error(`Failed to fetch podcast: ${error.message}`);
      }
    };

    fetchPodcastData();
  }, [podId]);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  if (!podcast) {
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
            <PodcastImage podcast={podcast} />
            <div className="col-span-12 md:col-span-7">
              <PodcastInfo podcast={podcast} />
              <PodcastData podcast={podcast} />
            </div>
          </div>
          <div className="px-4">
            <TopCreators
              text={"Recommended Podcasts"}
              isTwoRows={true}
              data={recommendedPodcasts}
              page="podcast"
              contentType="podcast"
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SinglePodcast;