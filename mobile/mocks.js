import 'react-native-gesture-handler/jestSetup'
import { jest } from '@jest/globals'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {
    /* TODO document why this arrow function is empty */
  }

  return Reanimated
})

global.__reanimatedWorkletInit = jest.fn()
