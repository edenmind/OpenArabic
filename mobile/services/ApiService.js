import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.openarabic.io/api/",
});

const textEndpoint = "/texts";

const getTexts = async (category, pageSize, pageNumber) => {
  try {
    const result = await instance.get(textEndpoint, {
      params: {
        category: category,
        pageSize: pageSize,
        pageNumber: pageNumber,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getText = async (id) => {
  try {
    const result = await instance.get(`${textEndpoint}/${id}`);
    console.log("text: " + result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { getTexts, getText };
