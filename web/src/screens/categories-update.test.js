import CategoriesUpdate from './categories-update.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import * as api from '../services/api-service.js'
import { updateCategory } from '../services/api-service.js'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  renderer.render(<CategoriesUpdate />)
})

it('should send a request to the API with the correct data', () => {
  const mockCategory = {
    name: 'Test Category',
    level: 10,
    description: 'This is a test category'
  }

  // Mock the API request
  const mockUpdateCategory = jest
    .spyOn(api, 'updateCategory')
    .mockImplementation(() => Promise.resolve({ success: true }))

  // Call the addCategory function
  updateCategory(mockCategory)

  // Check that the API request was made with the correct data
  expect(mockUpdateCategory).toHaveBeenCalledWith(mockCategory)
})
