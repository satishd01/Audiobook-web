// src/apis/followApi.js
import axios from 'axios';

export const followAudiobook = async (userId, mediaType, mediaId, token) => {
  try {
    const response = await axios.post(`https://audiobook.shellcode.cloud/api/follow`, { user_id: userId, media_type: mediaType, media_id: mediaId }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('Error following media:', error);
    throw error;
  }
};

export const unfollowAudiobook = async (userId, mediaType, mediaId, token) => {
  try {
    const response = await axios.post(`https://audiobook.shellcode.cloud/api/unfollow`,{ user_id: userId, media_type: mediaType, media_id: mediaId }, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('Error unfollowing media:', error);
    throw error;
  }
};