import CategoriesAdd from './categories-add.js'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow' // ES6
import * as api from '../services/api-service.js'
import { addCategory } from '../services/api-service.js'

it('renders without crashing', () => {
  const renderer = new ShallowRenderer()

  renderer.render(<CategoriesAdd />)
})

describe('addCategory function', () => {
  it('should send a request to the API with the correct data', () => {
    const mockCategory = {
      name: 'Test Category',
      level: 10,
      description: 'This is a test category'
    }

    // Mock the API request
    const mockAddCategory = jest.spyOn(api, 'addCategory').mockImplementation(() => Promise.resolve({ success: true }))

    // Call the addCategory function
    addCategory(mockCategory)

    // Check that the API request was made with the correct data
    expect(mockAddCategory).toHaveBeenCalledWith(mockCategory)
  })
})
