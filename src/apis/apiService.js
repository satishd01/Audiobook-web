// src/api/apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://audiobook.shellcode.cloud/api';

export const fetchPodcastEpisodes = async (podcastId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/podcasts/${podcastId}/episodes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching podcast episodes:', error);
    throw error;
  }
};