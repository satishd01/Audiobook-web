// export const fetchToken = async () => {
//   const fetchToken = await fetch("https://audiobook.shellcode.cloud/api/token", {
//     method: "GET",
//     credentials: "include",
//   });
//   const token = await fetchToken.json();
//   return token.token;
// };


export const fetchToken = () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');
  return token;
};