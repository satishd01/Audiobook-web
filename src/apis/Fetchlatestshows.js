import { fetchToken } from "./fetchToken";

export const fetchLatestPodcastShows = async (setLatestPodcasts) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      `https://audiobook.shellcode.cloud/api/admin/getLatestPodcastShow`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch latest podcast shows: ${res.status}`);
    }

    const data = await res.json();

    if (data?.message === "Top podcast creators fetched successfully") {
      setLatestPodcasts(data.creators || []);
    } else {
      console.log(`Failed to fetch latest podcast shows: ${data?.message}`);
    }
  } catch (error) {
    console.error(`Failed to fetch latest podcast shows: ${error.message}`);
  }
};


export const fetchLatestStoryShows = async (setLatestStories) => {
  try {
    const token = await fetchToken(); // Assuming fetchToken is a function that fetches the authentication token

    const res = await fetch('https://audiobook.shellcode.cloud/api/getLatestStory', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch latest story shows: ${res.status}`);
    }

    const data = await res.json();

    if (data?.message === "Latest story fetched successfully") {
      setLatestStories(data.story || []);
    } else {
      console.log(`Failed to fetch latest story shows: ${data?.message}`);
    }
  } catch (error) {
    console.error(`Failed to fetch latest story shows: ${error.message}`);
  }
};



export const fetchLatestAudiobooks = async (setLatestAudiobooks) => {
  try {
    const token = await fetchToken(); // Assuming fetchToken is a function that fetches the authentication token

    const res = await fetch('https://audiobook.shellcode.cloud/api/getLatestAudiobook', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch latest audiobooks: ${res.status}`);
    }

    const data = await res.json();

    if (data?.message === "Latest audiobook fetched successfully") {
      setLatestAudiobooks(data.audiobook || []);
    } else {
      console.log(`Failed to fetch latest audiobooks: ${data?.message}`);
    }
  } catch (error) {
    console.error(`Failed to fetch latest audiobooks: ${error.message}`);
  }
};