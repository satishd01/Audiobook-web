// src/apis/downloadApi.js
import { fetchToken } from "./fetchToken";

export const downloadApi = async (mediaType, mediaId, episodeId) => {
  try {
    const token = await fetchToken();
    const res = await fetch(
      `https://audiobook.shellcode.cloud/api/downloads`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mediaType,
          mediaId,
          episodeId,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to download: ${res.status}`);
    }

    const blob = await res.blob();
    return blob;
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};