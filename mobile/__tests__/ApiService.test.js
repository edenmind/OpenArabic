// import axios from 'axios';
// import { useDispatch } from 'react-redux';

// import {
//   BASE_URL,
//   getCategories,
//   getText,
//   getTexts,
// } from '../services/ApiService';

// jest.mock('axios');

// describe('getTexts', () => {
//   describe('when API call fails', () => {
//     it('should return error message', async () => {
//       // given
//       const message = 'Network Error';
//       axios.get.mockRejectedValueOnce(new Error(message));

//       // when
//       const result = await getTexts('Adab', 7, 1);

//       // then
//       expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}texts`, {
//         params: {
//           category: 'Adab',
//           pageNumber: 1,
//           pageSize: 7,
//         },
//       });
//       expect(result).toEqual(new Error(message));
//     });
//   });
//   describe('when API call is successful', () => {
//     it('should return category list', async () => {
//       // arrange
//       axios.get.mockResolvedValueOnce();

//       // act
//       const result = await getTexts('Adab', 7, 1);

//       // assert
//       expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}texts`, {
//         params: {
//           category: 'Adab',
//           pageNumber: 1,
//           pageSize: 7,
//         },
//       });
//     });
//   });
// });

// describe('getCategories', () => {
//   describe('when API call fails', () => {
//     it('should return error message', async () => {
//       // given
//       const message = 'Network Error';
//       axios.get.mockRejectedValueOnce(new Error(message));

//       // when
//       const result = await getCategories();

//       // then
//       expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}categories`);
//       expect(result).toEqual(new Error(message));
//     });
//   });
//   describe('when API call is successful', () => {
//     it('should return category list', async () => {
//       // arrange
//       axios.get.mockResolvedValueOnce();

//       // act
//       const result = await getCategories();

//       // assert
//       expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}categories`);
//     });
//   });
// });

// describe('getText', () => {
//   describe('when API call fails', () => {
//     it('should return error message', async () => {
//       // given
//       const message = 'Network Error';
//       axios.get.mockRejectedValueOnce(new Error(message));

//       // when
//       const dispatch = useDispatch();
//       const fetchText = () => dispatch(getText(1));
//       const result = await fetchText();

//       // then
//       expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}texts/1`);
//       expect(result).toEqual(new Error(message));
//     });
//   });
//   describe('when API call is successful', () => {
//     it('should return text', async () => {
//       // arrange
//       axios.get.mockResolvedValueOnce();

//       // act
//       const dispatch = useDispatch();
//       const fetchText = () => dispatch(getText('1'));
//       fetchText();

//       // assert
//       expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}texts/1`);
//     });
//   });
// });
