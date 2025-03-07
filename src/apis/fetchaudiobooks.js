import { fetchToken } from "./fetchToken";

export const fetchAudiobooks = async (setAudiobooks) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      `https://audiobook.shellcode.cloud/api/audiobooks`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch audiobooks: ${res.status}`);
    }

    const data = await res.json();

    if (data?.success && data?.message === "AudioBooks fetched successfully") {
      setAudiobooks(data.data || []);
    } else {
      console.log(`Failed to fetch audiobooks: ${data?.message}`);
    }
  } catch (error) {
    console.error(`Failed to fetch audiobooks: ${error.message}`);
  }
};