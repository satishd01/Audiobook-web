// src/apis/fetchListeningHistory.js
import { fetchToken } from "./fetchToken";

export const fetchListeningHistory = async () => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      "https://audiobook.shellcode.cloud/api/history/podcast",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch listening history: ${res.status}`);
    }

    const data = await res.json();

    if (data?.status && data?.message === "History fetched successfully") {
      return data.data;
    } else {
      console.log(`Failed to fetch listening history: ${data?.message}`);
      return {
        podcasts: { today: [], yesterday: [], other: [] },
        audiobooks: { today: [], yesterday: [], other: [] },
        stories: { today: [], yesterday: [], other: [] },
      };
    }
  } catch (error) {
    console.error(`Failed to fetch listening history: ${error.message}`);
    return {
      podcasts: { today: [], yesterday: [], other: [] },
      audiobooks: { today: [], yesterday: [], other: [] },
      stories: { today: [], yesterday: [], other: [] },
    };
  }
};