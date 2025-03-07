import { fetchToken } from "./fetchToken";

export const fetchRecommendedPodcasts = async (id, setRecommendedPodcasts) => {
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
      throw new Error(`Failed to fetch recommended podcasts by id: ${res.status}`);
    }

    const data = await res.json();

    if (data?.message === "Creator and related content fetched successfully") {
      setRecommendedPodcasts(data.recommendedPodcasts || []);
    } else {
      console.log(`Failed to fetch recommended podcasts by id: ${data?.message}`);
    }
  } catch (error) {
    console.error(`Failed to fetch recommended podcasts by id: ${error.message}`);
  }
};