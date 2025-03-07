import { fetchToken } from "./fetchToken";

export const fetchEpisodeAudio = async (episodeId) => {
  const token = await fetchToken();
  const response = await fetch(`http://audiobook.shellcode.cloud/api/admin/episodes/${episodeId}/audio`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch episode audio');
  }

  const data = await response.json();
  return data.audioUrl; // Assuming the response contains an audioUrl field
};