import { setTopCreators } from "../app/slices/topCreatorsSlice";
import { fetchToken } from "./fetchToken";

export const FetchTopAudiobookCreators = async (setTopCreators) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      "https://audiobook.shellcode.cloud/api/getTopAudiobookCreators",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch top audiobook creators: ${res.status}`);
    }

    const data = await res.json();

    if (data?.message === "Top audiobook creators fetched successfully" && data?.creators?.length > 0) {
      setTopCreators(data.creators);
    } else {
      console.log(`Failed to fetch top audiobook creators: ${data?.message}`);
    }
  } catch (error) {
    console.error(`Failed to fetch top audiobook creators: ${error.message}`);
  }
};