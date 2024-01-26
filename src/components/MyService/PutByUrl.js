import axios from 'axios';

const PutByUrl = async (url, endPoint, id,requestBody ,getHeaderToken) => {
  try {
    const response = await axios.put(`${url}${endPoint}/${id}`,requestBody, getHeaderToken);
    return {
      data: response.data.data,
      error: response.data.error,
      message: response.data.message,
    };
  } catch (error) {
    console.error('Error during PUT request:', error);
    return {
      data: null,
      error: error,
      message: 'Error during PUT request',
    };
  }
};

export default PutByUrl;
