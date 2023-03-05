import axios from 'axios';

export const fetchAllGeneratedPhoto = async () => {
  try {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    );
    return data;
  } catch (e) {
    throw new Error('Getting error when fetching data');
  }
};
