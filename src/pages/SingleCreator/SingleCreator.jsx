import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Use useParams to get creatorId from URL
import { useDispatch, useSelector } from "react-redux";
import { toggleSlider } from "../../app/slices/sliderSlice";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import LatestShows from "../../components/Podcasts/LatestShows/LatestShows";
import TopCreators from "../../components/Podcasts/TopCreators/TopCreators";
import CreatorImage from "../../components/SingleCreator/CreatorImage/CreatorImage";
import CreatorInfo from "../../components/SingleCreator/CreatorInfo/CreatorInfo";
import SliderDiv from "../../components/SliderDiv/SliderDiv";
import {
  resizeHandler,
  scrollToTop,
  userSliderHandler,
} from "../../utils/constants";
import CreatorData from "./../../components/SingleCreator/CreatorData/CreatorData";
import { fetchPodcasts } from "./../../apis/fetchPodcasts";
import { fetchTopPodcastCreators } from "./../../apis/fetchTopPodcastCreators";
import { fetchrecommendedCreators } from "./../../apis/recomandedCreators";
import { fetchRecommendedPodcasts } from "./../../apis/recomondedpodcast";

const SingleCreator = () => {
  const [creator, setCreator] = useState(null);
  console.log("creator", creator);

  const [podcasts, setPodcasts] = useState([]);
  console.log(podcasts,"podacst")
  const [audiobooks, setAudiobooks] = useState([]);
  console.log("audiobooks", audiobooks);
  const [stories, setStories] = useState([]);
  console.log("stories", stories);
  const [topCreators, setTopCreators] = useState([]);
  const [recommendedCreatorsList, setRecommendedCreatorsList] = useState([]);
  const [recommendedPodcastsList, setRecommendedPodcastsList] = useState([]);

  // Use useParams to get creatorId from the URL
  const { creatorId } = useParams();
  const isUserViewOpen = useSelector((state) => state.slider.isSliderOpen);
  const dispatch = useDispatch();

  // Debug creatorId from URL
  useEffect(() => {
    console.log("Creator ID from URL:", creatorId);
  }, [creatorId]);

  useEffect(() => {
    scrollToTop();
    fetchPodcasts(setPodcasts);
    fetchTopPodcastCreators(setTopCreators);
  }, []);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token"); // Replace "authToken" with your actual key

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch(
          `https://audiobook.shellcode.cloud/api/admin/creator/creators/${creatorId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Log the response to debug
        console.log("API Response:", data);

        // Set the creator state correctly
        if (data.creator) {
          console.log("Setting creator state:", data.creator);
          setCreator(data.creator); // Set the creator object from the response
        } else {
          console.error("Creator data not found in API response");
        }

        // Set podcasts, audiobooks, and stories from the response
        setStories(data.stories || []);
        setPodcasts(data.podcasts || []);
        setAudiobooks(data.audiobooks || []);
      
      } catch (error) {
        console.error("Failed to fetch creator data:", error);
      }
    };

    if (creatorId) {
      console.log("Fetching creator data for ID:", creatorId);
      fetchCreatorData();
      fetchrecommendedCreators(creatorId, setRecommendedCreatorsList);
      fetchRecommendedPodcasts(creatorId, setRecommendedPodcastsList);
    } else {
      console.error("No creator ID found in URL");
    }
  }, [creatorId]);

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  // Debug creator state
  useEffect(() => {
    console.log("Creator state:", creator);
  }, [creator]);

  return (
    creator && (
      <div>
        <Navbar />
        <div className="grid grid-cols-12">
          <SliderDiv />

          <div
            className={`${
              isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
            } col-span-12 text-white bg-black relative h-auto px-4 md:px-10 py-10`}
          >
            <div className="grid grid-cols-12  md:gap-10 gap-3">
              <CreatorImage creator={creator} />
              <div className="col-span-12 md:col-span-7">
                <CreatorInfo creator={creator} />
                <CreatorData creator={creator} type="podcast" data={podcasts} />
                <CreatorData creator={creator} type="audiobook" data={audiobooks} />
                <CreatorData creator={creator} type="story" data={stories} />
              </div>
            </div>
            <div>
              <LatestShows
                text={"Recommended Creators"}
                isTwoRows={true}
                data={recommendedCreatorsList}
                page="creator"
              />
            </div>
            <div>
              <TopCreators
                text={"Recommended Podcasts"}
                isTwoRows={true}
                data={recommendedPodcastsList}
                page="podcast"
              />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  );
};

export default SingleCreator;