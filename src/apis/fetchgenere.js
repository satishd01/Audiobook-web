import { fetchToken } from "./fetchToken";

export const fetchGenres = async (setGenres) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      "https://audiobook.shellcode.cloud/api/admin/genre/all",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch genres: ${res.status}`);
    }

    const data = await res.json();

    if (data?.message === "Genres fetched successfully") {
      setGenres(data.data || []);
    } else {
      console.log(`Failed to fetch genres: ${data?.message}`);
    }
  } catch (error) {
    console.error(`Failed to fetch genres: ${error.message}`);
  }
};