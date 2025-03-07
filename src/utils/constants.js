import { FaHeart } from "react-icons/fa";
import { IoDownloadSharp } from "react-icons/io5";
import { GiBookCover } from "react-icons/gi";

export const user = {
  name: "Rohan Patil",
  email: "rohan@gmail.com",
  imageUrl: "https://placehold.co/50",
  following: 0,
};

export const creatorNameLength = 14;
export const creatorTitleLength = 18;
export const playerTitleLength = 35;

export const libraryItems = [
  {
    id: 1,
    title: "Liked Podcasts",
    icon: FaHeart,
    duration: "60 mins",
  },
  {
    id: 2,
    title: "Downloaded Podcasts",
    icon: IoDownloadSharp,
    duration: "60 mins",
  },
  {
    id: 3,
    title: "Your Playlist",
    icon: GiBookCover,
    duration: "60 mins",
  },
];

export const playlistData = [
  {
    id: 1,
    name: "Motivation",
    episodes: 10,
  },
  {
    id: 2,
    name: "Health",
    episodes: 10,
  },
];

export const userSliderHandler = (dispatch, toggleSlider, isUserViewOpen) => {
  let startX = 0;

  const disableScrolling = () => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  };

  const enableScrolling = () => {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
  };

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - startX;
    if (deltaX < -50) {
      dispatch(toggleSlider(false));
    }
  };

  if (window.innerWidth < 640 && isUserViewOpen) {
    disableScrolling();
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
  } else {
    enableScrolling();
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
  }

  return () => {
    enableScrolling();
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
  };
};

export const resizeHandler = (dispatch, toggleSlider) => {
  const handleResize = () => {
    const isMobile = window.innerWidth < 750;
    if (isMobile) {
      dispatch(toggleSlider(false));
    } else {
      dispatch(toggleSlider(true));
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
