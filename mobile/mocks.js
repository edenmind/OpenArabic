/* eslint-disable global-require */
/* eslint-disable no-undef */

import { jest } from '@jest/globals'

import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})

global.__reanimatedWorkletInit = jest.fn()

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// jest.mock('react-native-paper/lib/commonjs/components/ActivityIndicator');

// jest.mock('react-native-paper/lib/commonjs/components/BottomNavigation');

// jest.mock('@react-navigation/native/lib/commonjs/useBackButton');
