// src/apis/fetchUserDownloads.js
import { fetchToken } from "./fetchToken";

export const fetchUserDownloads = async () => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      "https://audiobook.shellcode.cloud/api/downloads",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch user downloads: ${res.status}`);
    }

    const data = await res.json();

    if (data) {
      return {
        podcast: data.podcast || [],
        audiobook: data.audiobook || [],
        story: data.story || [],
      };
    } else {
      console.log(`Failed to fetch user downloads: ${data?.message}`);
      return {
        podcast: [],
        audiobook: [],
        story: [],
      };
    }
  } catch (error) {
    console.error(`Failed to fetch user downloads: ${error.message}`);
    return {
      podcast: [],
      audiobook: [],
      story: [],
    };
  }
};