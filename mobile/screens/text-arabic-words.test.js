import 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import React from 'react'
import TextArabicWords from './text-arabic-words.js'
import renderer, { act } from 'react-test-renderer'
import { it } from '@jest/globals'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { NavigationContainer } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'

describe('TextArabicWords', () => {
  jest.useFakeTimers()
  jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native')
    RN.BackHandler.addEventListener = jest.fn()

    return RN
  })

  it('renders the correct number of buttons for a given text input', async () => {
    const text = {
      sentences: [
        {
          words: [
            { arabic: 'كَلِمَةٌ', english: 'a word' },
            { arabic: 'أُخْرَىٰ', english: 'another' }
          ]
        }
      ]
    }
    const setEnglishTranslation = jest.fn()

    let component
    await act(async () => {
      component = renderer.create(
        <Provider store={store}>
          <NavigationContainer>
            <TextArabicWords text={text} setEnglishTranslation={setEnglishTranslation} />
          </NavigationContainer>
        </Provider>
      )
    })

    const buttons = component.root.findAllByType(Button)

    expect(buttons.length).toEqual(2)
  })

  it('calls the setEnglishTranslation function with the correct value when a button is pressed', async () => {
    const text = {
      sentences: [
        {
          words: [
            { arabic: 'كَلِمَةٌ', english: 'a word' },
            { arabic: 'أُخْرَىٰ', english: 'another' }
          ]
        }
      ]
    }
    const setEnglishTranslation = jest.fn()

    let component
    await act(async () => {
      component = renderer.create(
        <Provider store={store}>
          <NavigationContainer>
            <TextArabicWords text={text} setEnglishTranslation={setEnglishTranslation} />
          </NavigationContainer>
        </Provider>
      )
    })

    const buttons = component.root.findAllByType(Button)
    await act(async () => {
      buttons[0].props.onPress()
    })

    expect(setEnglishTranslation).toHaveBeenCalledWith('a word (kalimatun)')
  })
})
