import { fetchToken } from "./fetchToken";

export const fetchrecommendedCreators = async (id, setRecommendedCreators) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      `https://audiobook.shellcode.cloud/api/admin/creator/creators/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch recommended creators by id: ${res.status}`);
    }

    const data = await res.json();

    if (data?.message === "Creator and related content fetched successfully") {
      setRecommendedCreators(data.recommendedCreators || []);
    } else {
      console.log(`Failed to fetch recommended creators by id: ${data?.message}`);
    }
  } catch (error) {
    console.error(`Failed to fetch recommended creators by id: ${error.message}`);
  }
};