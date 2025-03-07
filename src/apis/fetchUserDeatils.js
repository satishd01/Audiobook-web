import toast from "react-hot-toast";
import { fetchToken } from "./fetchToken";

export const login = async (navigate, email, setUser) => {
  try {
    const token = await fetchToken();

    const res = await fetch(
      `https://audiobook.shellcode.cloud/api/userinfo/email/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    if (data?.user?.email) {
      localStorage.setItem("user", JSON.stringify(data.user));
     
      navigate("/");
    } else {
      throw new Error(data.message || "failed to get details");
    }
  } catch (error) {
    console.error(`Failed to get details`);
    toast.error(error.message || "Something went wrong, please try again.");
  }
};
