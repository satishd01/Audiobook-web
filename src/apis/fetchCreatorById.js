import { fetchToken } from "./fetchToken";

export const fetchCreatorById = async (id, setCreator) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      `https://audiobook.shellcode.cloud/api/creators/creators/${id}`,
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
    if (data?.creator) {
      setCreator(data.creator);
    }
  } catch (error) {
    console.log("Failed to fetch creator by Id");
  }
};
