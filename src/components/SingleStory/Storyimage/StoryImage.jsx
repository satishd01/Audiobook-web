import React from "react";

const StoryImage = ({ story }) => {
  return (
    <div className="col-span-5">
      <img
        alt={story.name}
        src={story.image}
        className="md:w-[400px] w-[200px] rounded-xl"
      />
    </div>
  );
};

export default StoryImage;