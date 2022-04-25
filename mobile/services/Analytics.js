import * as Amplitude from 'expo-analytics-amplitude'

import API from '../constants/amplitude'

let isInitialized = false
const apiKey = API.key

export const events = {
  HOME: 'HOME'
}

export function initialize() {
  if (isInitialized || !apiKey) {
    return
  }

  Amplitude.initializeAsync(apiKey)
  isInitialized = true
}

export function track(event, options) {
  initialize()

  if (options) {
    Amplitude.logEventWithPropertiesAsync(event, options)
  } else {
    Amplitude.logEventAsync(event)
  }
}

export default {
  events,
  initialize,
  track
}
