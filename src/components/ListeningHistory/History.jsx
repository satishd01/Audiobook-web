import React from "react";
import { FaUser } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const History = ({ historyData }) => {
  return (
    <div>
      {historyData &&
        Object.entries(historyData).map(([day, items]) => (
          <div key={day}>
            <h2 className="text-xl my-4">{day}</h2>
            {items.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2 mt-1">
                  <div className="flex gap-4 md:gap-10 items-center mb-3">
                    <img
                      src={item.image || "default_image_url.jpg"} // Provide a default image URL
                      alt={item.title || "No Title"}
                      className="rounded-md w-12 h-12 md:w-16 md:h-16"
                    />
                    <div>
                      <h3>{item.title || "No Title"}</h3>
                      <p className="text-sm font-light mt-2 flex items-center gap-3">
                        <FaUser /> {item.creator_name || "Unknown Creator"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="md:p-3 p-2 rounded-full flex items-center justify-center bg-white">
                      <IoPlay className="text-[#FF0000]" />
                    </div>
                    <BsThreeDotsVertical className="text-white text-xl cursor-pointer" />
                  </div>
                </div>
                <hr className="h-1 text-[#767676]" />
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default History;