import axios from 'axios'
import { expect, describe, it, jest } from '@jest/globals'
import { getCategories, getText, getTexts } from './api-service.js'

jest.mock('axios')

describe('getTexts', () => {
  describe('when API call fails', () => {
    it('should return error message', async () => {
      // arrange
      const message = 'Network Error'
      axios.get.mockRejectedValueOnce(new Error(message))

      // act
      const result = await getTexts('Adab', 7, 1)

      // assert
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
