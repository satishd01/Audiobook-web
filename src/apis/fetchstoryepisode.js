

import { fetchToken } from "./fetchToken";

export const fetchStoryEpisodes = async (id, setEpisodes) => {
  try {
    const token = await fetchToken();

    const res = await fetch(`https://audiobook.shellcode.cloud/api/user/stories/${id}/episodes`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch episodes:", res.status);
      return;
    }

    const data = await res.json();
    if (data.success && data.data && data.data.length > 0) {
      setEpisodes(data.data);
    } else {
      console.warn("No episodes found or data is empty");
    }
  } catch (error) {
    console.error("Failed to fetch episodes:", error);
  }
};








// import { fetchToken } from "./fetchToken";

// export const fetchPodcastEpisodes = async (id, setEpisodes) => {
//   try {
//     const token = await fetchToken();

//     const res = await fetch(
//       `https://audiobook.shellcode.cloud/api/user/podcasts/37/episodes`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (!res.ok) {
//       console.log("Failed to fetch");
//     }

//     const data = await res.json();
//     if (data?.length > 0) {
//       setEpisodes(data);
//     }
//   } catch (error) {
//     console.log("Failed to fetch creator by Id");
//   }
// };
