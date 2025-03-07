import React from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import PlaylistPodcasts from "../../MyPlaylist/PlaylistPodcasts/PlaylistPodcasts";

const ProfileBody = () => {
  return (
    <div className="grid grid-cols-12 gap-4 px-4 md:px-10 mt-5">
      <div className="col-span-12 md:col-span-5">
        <ProfileCard />
      </div>
      {/* <div className="col-span-12 md:col-span-7">
        <p className="text-lg font-semibold mb-3">Your Liked Shows</p>
        <PlaylistPodcasts />
      </div> */}
    </div>
  );
};

export default ProfileBody;
