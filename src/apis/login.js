import toast from "react-hot-toast";
import { fetchToken } from "./fetchToken";

export const login = async (navigate, user) => {
  try {
    const token = await fetchToken();

    const res = await fetch("https://audiobook.shellcode.cloud/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    if (data?.user?.email) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/");
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (error) {
    toast.error("Invalid Details");
    console.error(`Failed to login`);
    toast.error(error.message || "Something went wrong, please try again.");
  }
};
