import React, { useEffect, useState } from "react";
import { BsSortDown, BsSortUpAlt } from "react-icons/bs";
import { fetchUserDownloads } from "../../../apis/fetchUserDownloads";
import DownloadedCard from "../DownloadedCard/DownloadedCard";

const DownloadedList = () => {
  const [toggleSort, setToggleSort] = useState(true);
  const [data, setData] = useState({
    podcast: [],
    audiobook: [],
    story: [],
  });
  const [selectedContentType, setSelectedContentType] = useState("podcast");

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const downloadsData = await fetchUserDownloads();
        setData(downloadsData);
      } catch (error) {
        console.error("Failed to fetch user downloads:", error);
      }
    };

    fetchDownloads();
  }, []);

  useEffect(() => {
    if (toggleSort) {
      const sorted = [...data[selectedContentType]].sort(
        (a, b) => new Date(a.downloaded_at) - new Date(b.downloaded_at)
      );
      setData({ ...data, [selectedContentType]: sorted });
    } else {
      const sorted = [...data[selectedContentType]].sort(
        (a, b) => new Date(b.downloaded_at) - new Date(a.downloaded_at)
      );
      setData({ ...data, [selectedContentType]: sorted });
    }
  }, [toggleSort, selectedContentType]);

  const handleContentTypeClick = (contentType) => {
    setSelectedContentType(contentType);
  };

  return (
    <div className="bg-[#101010] py-4 md:mx-2 mt-5 md:px-8 px-4">
      <div className="flex items-center justify-between mb-5">
        <ul className="flex items-center md:gap-4 gap-2 md:text-sm text-[10px]">
          <li
            className={`rounded-lg border border-white px-2 py-1 cursor-pointer ${
              selectedContentType === "podcast" ? "bg-white text-black" : ""
            }`}
            onClick={() => handleContentTypeClick("podcast")}
          >
            Podcasts
          </li>
          <li
            className={`rounded-lg border border-white px-2 py-1 cursor-pointer ${
              selectedContentType === "audiobook" ? "bg-white text-black" : ""
            }`}
            onClick={() => handleContentTypeClick("audiobook")}
          >
            Audio Books
          </li>
          <li
            className={`rounded-lg border border-white px-2 py-1 cursor-pointer ${
              selectedContentType === "story" ? "bg-white text-black" : ""
            }`}
            onClick={() => handleContentTypeClick("story")}
          >
            Stories
          </li>
        </ul>
        <div
          className="flex items-center md:text-base gap-3 text-sm"
          onClick={() => setToggleSort((prev) => !prev)}
        >
          {toggleSort ? (
            <BsSortUpAlt className="text-lg" />
          ) : (
            <BsSortDown className="text-lg" />
          )}
          <p className="md:text-base text-[10px] whitespace-nowrap">Sort by</p>
        </div>
      </div>

      <div className="max-h-[400px] flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
        {data[selectedContentType]?.map((item) => (
          <div key={item.id} className="border-b py-3">
            <DownloadedCard podcast={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadedList;