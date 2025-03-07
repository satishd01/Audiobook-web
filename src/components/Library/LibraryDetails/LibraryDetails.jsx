import React, { useEffect, useState } from "react";
import { GoClockFill } from "react-icons/go";
import { IoMdShare } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LibraryCard from "../LibraryCard/LibraryCard";
import { fetchUserLibrary } from "../../../apis/fetchlibrary";

const LibraryDetails = () => {
  const navigate = useNavigate();
  const searchedText = useSelector((state) => state.search.searchedText);
  const [libraryData, setLibraryData] = useState(null);
  const [selectedContentType, setSelectedContentType] = useState("podcasts");

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const data = await fetchUserLibrary();
        setLibraryData(data);
      } catch (error) {
        console.error("Failed to fetch user library:", error);
      }
    };

    fetchLibrary();
  }, []);

  const handleNavigation = (item) => {
    navigate(`/${item.title.toLowerCase().replace(" ", "-")}`);
  };

  const handleContentTypeClick = (contentType) => {
    setSelectedContentType(contentType);
  };

  return (
    <div>
      {searchedText ? (
        <div className="w-full md:h-[70vh] h-[50vh]">
          {libraryData?.liked[selectedContentType]
            ?.filter((item) =>
              item.name.toLowerCase().includes(searchedText.toLowerCase())
            )
            .map((item) => (
              <div key={item.id} onClick={() => handleNavigation(item)}>
                <LibraryCard item={item} />
              </div>
            ))}
        </div>
      ) : (
        <>
          <p className="text-xl">Your Library</p>
          <ul className="flex items-center gap-4 mt-4 text-sm">
            <li
              className={`rounded-lg border border-white px-2 py-1 cursor-pointer ${
                selectedContentType === "podcasts" ? "bg-white text-black" : ""
              }`}
              onClick={() => handleContentTypeClick("podcasts")}
            >
              Podcasts
            </li>
            <li
              className={`rounded-lg border border-white px-2 py-1 cursor-pointer ${
                selectedContentType === "audiobooks" ? "bg-white text-black" : ""
              }`}
              onClick={() => handleContentTypeClick("audiobooks")}
            >
              Audio Books
            </li>
            <li
              className={`rounded-lg border border-white px-2 py-1 cursor-pointer ${
                selectedContentType === "stories" ? "bg-white text-black" : ""
              }`}
              onClick={() => handleContentTypeClick("stories")}
            >
              Stories
            </li>
          </ul>

          <div className="mt-5">
            <p className="mb-4 text-xl">Liked {selectedContentType.charAt(0).toUpperCase() + selectedContentType.slice(1)}</p>
            {libraryData?.liked[selectedContentType]?.slice(0, 4).map((item) => (
              <div key={item.id} onClick={() => handleNavigation(item)}>
                <LibraryCard item={item} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LibraryDetails;