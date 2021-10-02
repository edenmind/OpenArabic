import axios from 'axios';

export const BASE_URL = 'https://api.openarabic.io/api/';

const textEndpoint = 'texts';
const categoryEndpoint = 'categories';

export const getTexts = async (category, pageSize, pageNumber) => {
  try {
    const result = await axios.get(`${BASE_URL}${textEndpoint}`, {
      params: {
        category,
        pageSize,
        pageNumber,
      },
    });
    console.log('log2: ' + `${BASE_URL}${textEndpoint}`);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const getText = async (id) => {
  try {
    const result = await axios.get(`${BASE_URL}${textEndpoint}/${id}`);
    console.log('log3: ' + `${BASE_URL}${textEndpoint}/${id}`);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const getCategories = async () => {
  try {
    const result = await axios.get(`${BASE_URL}${categoryEndpoint}`);
    console.log('log1: ' + `${BASE_URL}${categoryEndpoint}`);
    return result.data;
  } catch (error) {
    return error;
  }
};
