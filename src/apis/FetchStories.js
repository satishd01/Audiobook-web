import { fetchToken } from "./fetchToken";

export const fetchStories = async (setStories) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      `https://audiobook.shellcode.cloud/api/stories`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch stories: ${res.status}`);
    }

    const data = await res.json();

    if (data?.success && data?.message === "Stories fetched successfully") {
      setStories(data.data || []);
    } else {
      console.log(`Failed to fetch stories: ${data?.message}`);
    }
  } catch (error) {
    console.error(`Failed to fetch stories: ${error.message}`);
  }
};