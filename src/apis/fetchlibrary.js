// src/apis/fetchUserLibrary.js
import { fetchToken } from "./fetchToken";

export const fetchUserLibrary = async () => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      "https://audiobook.shellcode.cloud/api/user/library",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch user library: ${res.status}`);
    }

    const data = await res.json();

    if (data?.success && data?.message === "Library fetched successfully") {
      return data.data;
    } else {
      console.log(`Failed to fetch user library: ${data?.message}`);
      return null;
    }
  } catch (error) {
    console.error(`Failed to fetch user library: ${error.message}`);
    return null;
  }
};