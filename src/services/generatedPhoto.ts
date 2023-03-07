import axios from 'axios';

export const getGeneratedPhoto = async (prompt: string) => {
  try {
    const body = {
      prompt,
    };
    const { data } = await axios.post(`/api/generate-picture`, body);
    return data;
  } catch (e) {
    throw new Error('Getting error when getting data');
  }
};
