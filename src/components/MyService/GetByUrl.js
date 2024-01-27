import axios from 'axios';
import { useAuth } from "AuthContext";

const GetByUrl = async (urlPoint) => {
    const {url} = useAuth();

  try {
    const response = await axios.get(`${url}${urlPoint}`);
    return {
      data: response.data.data,
      error: response.data.error,
      message: response.data.message,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      data: null,
      error: error,
      message: 'Error fetching data',
    };
  }
};

export default GetByUrl;
