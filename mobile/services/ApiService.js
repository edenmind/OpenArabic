/* eslint-disable no-unreachable */
import axios from 'axios';
import { GET_CATEGORIES, GET_TEXT, GET_TEXTS } from '../redux/actions';

export const BASE_URL = 'https://api.openarabic.io/api/';

const textEndpoint = 'texts';
const categoryEndpoint = 'categories';

export const getTexts = (category, pageSize, pageNumber) => {
  try {
    return async (dispatch) => {
      const res = await axios.get(`${BASE_URL}${textEndpoint}`, {
        params: {
          category,
          pageSize,
          pageNumber,
        },
      });
      if (res.data) {
        dispatch({
          type: GET_TEXTS,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = () => {
  try {
    return async (dispatch) => {
      const res = await axios.get(`${BASE_URL}${categoryEndpoint}`);
      if (res.data) {
        dispatch({
          type: GET_CATEGORIES,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const getText = (id) => {
  try {
    return async (dispatch) => {
      const res = await axios.get(`${BASE_URL}${textEndpoint}/${id}`);
      if (res.data) {
        dispatch({
          type: GET_TEXT,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    console.log(error);
  }
};
