import React, { useEffect, useState } from "react";
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
  const searchedText = useSelector((state) => state.search.searchedText); // Get the search query
  const [episodes, setEpisodes] = useState([]); // State to store episodes
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const dispatch = useDispatch();

  useEffect(() => {
    resizeHandler(dispatch, toggleSlider);
  }, [dispatch]);

  useEffect(() => {
    userSliderHandler(dispatch, toggleSlider, isUserViewOpen);
  }, [isUserViewOpen, dispatch]);

  useEffect(() => {
    if (searchedText && searchedText.length > 0) {
      setLoading(true);
      setError(null); // Reset any previous errors
      const fetchEpisodes = async () => {
        try {
          const response = await fetch(
            `https://audiobook.shellcode.cloud/api/episodes/search?query=${searchedText}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          // if (!response.ok) {
          //   throw new Error('Failed to fetch episodes');
          // }

          const data = await response.json();

          if (data.success && data.data.length > 0) {
            setEpisodes(data.data); // Store fetched episodes in state
          } else {
            setEpisodes([]); // Clear episodes if none found
          }
        } catch (err) {
          setError(err.message); // Set error message if the fetch fails
        } finally {
          setLoading(false); // Turn off loading once the request is complete
        }
      };

      fetchEpisodes();
    }
  }, [searchedText]); // Trigger API call whenever searchedText changes

  return (
    <>
      <SearchNav />
      <div className="grid grid-cols-12">
        <SliderDiv />
        <div
          className={`${
            isUserViewOpen ? "md:col-span-10" : "md:col-span-12"
          } col-span-12 text-white bg-black relative h-auto px-4 md:px-7 py-3`}>
          
          {/* Conditionally render the search results only if searchedText is available */}
          {loading && <p>Loading...</p>}

          {/* Show error message if there's an error */}
          {error && <p>{error}</p>}

          {/* Display episodes if search term is present and episodes are found */}
          {searchedText && searchedText.length > 0 && episodes.length > 0 ? (
            <div>
              <h2>Found Episodes:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {episodes.map((episode) => (
                  <div
                    key={episode.id}
                    className="episode-card bg-gray-800 p-3 rounded-md shadow-md flex flex-col items-center">
                    <img
                      src={episode.image}
                      alt={episode.title}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <h3 className="text-sm font-semibold">{episode.title}</h3>
                    <p className="text-xs text-center mt-1">{episode.description}</p>
                    <audio controls className="mt-2">
                      <source src={episode.audio_file} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Show message when no episodes are found
            <div>
              {searchedText && searchedText.length > 0 ? (
                <p>No episodes found for "{searchedText}"</p>
              ) : (
                <Genres />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
