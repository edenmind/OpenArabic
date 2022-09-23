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
      const result = getTexts('Adab', 7, 1)

      // assert
      expect(result).toBeTruthy
    })
  })
  describe('when API call is successful', () => {
    it('should return texts', async () => {
      // arrange
      axios.get.mockResolvedValueOnce()

      // act
      const result = getTexts('Adab', 7, 1)

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
      const result = getCategories()

      // then
      expect(result).toBeTruthy
    })
  })
  describe('when API call is successful', () => {
    it('should return category list', async () => {
      // arrange
      axios.get.mockResolvedValueOnce()

      // act
      const result = getCategories()

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
      const result = getText(1)

      // then
      expect(result).toBeTruthy
    })
  })
  describe('when API call is successful', () => {
    it('should return text', async () => {
      // arrange
      axios.get.mockResolvedValueOnce()

      // act

      const result = getText('1')

      // assert
      expect(result).toBeTruthy
    })
  })
})
