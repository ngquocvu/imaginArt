import axios from 'axios';

export const fetchAllGeneratedPhoto = async (prompt: string) => {
  try {
    const body = {
      prompt,
    };
    const { data } = await axios.post(`/api/generate-picture`, body);
    return data.data;
  } catch (e) {
    throw new Error('Getting error when fetching data');
  }
};
