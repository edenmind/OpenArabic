/* eslint-disable global-require */
/* eslint-disable no-undef */

import 'react-native-gesture-handler/jestSetup'

import { jest } from '@jest/globals'

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})

global.__reanimatedWorkletInit = jest.fn()
