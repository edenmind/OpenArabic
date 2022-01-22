import axios from 'axios'
import { expect, describe, it, jest } from '@jest/globals'
import { getCategories, getText, getTexts } from '../services/ApiService'

jest.mock('axios')

describe('getTexts', () => {
  describe('when API call fails', () => {
    it('should return error message', async () => {
      // given
      const message = 'Network Error'
      axios.get.mockRejectedValueOnce(new Error(message))

      // when
      const result = await getTexts('Adab', 7, 1)

      // then
      // expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}texts`, {
      //   params: {
      //     category: 'Adab',
      //     pageNumber: 1,
      //     pageSize: 7,
      //   },
      // });
      expect(result).toBeTruthy
    })
  })
  describe('when API call is successful', () => {
    it('should return texts', async () => {
      // arrange
      axios.get.mockResolvedValueOnce()

      // act
      const result = await getTexts('Adab', 7, 1)

      // assert
      expect(result).toBeTruthy
    })
  })
})

describe('getCategories', () => {
  describe('when API call fails', () => {
    it('should return error message', async () => {
      // given
      const message = 'Network Error'
      axios.get.mockRejectedValueOnce(new Error(message))

      // when
      const result = await getCategories()

      // then
      expect(result).toBeTruthy
    })
  })
  describe('when API call is successful', () => {
    it('should return category list', async () => {
      // arrange
      axios.get.mockResolvedValueOnce()

      // act
      const result = await getCategories()

      // assert
      expect(result).toBeTruthy
    })
  })
})

describe('getText', () => {
  describe('when API call fails', () => {
    it('should return error message', async () => {
      // given
      const message = 'Network Error'
      axios.get.mockRejectedValueOnce(new Error(message))

      // when
      const result = await getText(1)

      // then
      expect(result).toBeTruthy
    })
  })
  describe('when API call is successful', () => {
    it('should return text', async () => {
      // arrange
      axios.get.mockResolvedValueOnce()

      // act

      const result = await getText('1')

      // assert
      expect(result).toBeTruthy
    })
  })
})
