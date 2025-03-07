







import { fetchToken } from "./fetchToken";

export const fetchPodcasts = async (setPodcasts) => {
  try {
    const token = await fetchToken();

    const res = await fetch("https://audiobook.shellcode.cloud/api/admin/podcasts", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch podcasts:", res.status);
      return;
    }

    const data = await res.json();
    if (data && data.data && data.data.length > 0) {
      setPodcasts(data.data);
    } else {
      console.warn("No podcasts data available");
    }
  } catch (error) {
    console.error("Failed to fetch podcasts:", error);
  }
};




// salman code 

// import { fetchToken } from "./fetchToken";

// export const fetchPodcasts = async (setPodcasts) => {
//   try {
//     const token = await fetchToken();

//     const res = await fetch("https://audiobook.shellcode.cloud/api/admin/podcasts", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!res.ok) {
//       console.log("Failed to fetch");
//     }

//     const data = await res.json();
//     if (data?.length > 0) {
//       setPodcasts(data);
//     }
//   } catch (error) {
//     console.log(`failed to fetch top creators`);
//   }
// };
