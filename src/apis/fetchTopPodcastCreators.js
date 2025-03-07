import { setTopCreators } from "../app/slices/topCreatorsSlice";
import { fetchToken } from "./fetchToken";

export const fetchTopPodcastCreators = async (setTopCreators) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      "https://audiobook.shellcode.cloud/api/admin/creator/top-podcast-creators",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      console.log("Failed to fetch");
    }

    const data = await res.json();
    if (data?.creators?.length > 0) {
      setTopCreators(data.creators);
    }
  } catch (error) {
    console.log(`failed to fetch top creators`);
  }
};
