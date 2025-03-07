import toast from "react-hot-toast";
import { fetchToken } from "./fetchToken";

export const logout = async (navigate) => {
  try {
    const token = await fetchToken();

    const res = await fetch("https://audiobook.shellcode.cloud/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    if (data) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      throw new Error(data.message || "Logout failed");
    }
  } catch (error) {
    console.error(`Failed to login`);
    toast.error(error.message || "Something went wrong, please try again.");
  }
};
