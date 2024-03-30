import * as Haptics from 'expo-haptics'
import React, { useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Surface, Switch, useTheme, Divider } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { SegmentButtonWithHeader } from '../components/segemented-button.js'
import { storeData, getData } from '../services/storage.js'
import { useSharedStyles } from '../styles/common.js'

const DEFAULT_ARABIC_FONT_NAME = 'uthman'

export const TextSettings = () => {
  const [arabicFontName, setArabicFontName] = React.useState(DEFAULT_ARABIC_FONT_NAME)
  const [isTransliterationOn, setIsTransliterationOn] = React.useState(true)
  const [isDarkModeOn, setIsDarkModeOn] = React.useState(true)

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchMode = async () => {
      const value = await getData('isDarkModeOn')
      setIsDarkModeOn(value === 'on')
    }

    fetchMode()
  }, [])

  const storeArabicFontName = async (value) => {
    dispatch({ payload: value, type: 'SET_ARABIC_FONT_NAME' })

    await storeData('arabicFontName', value)
  }

  const getTransliteration = async () => {
    const value = await getData('isTransliterationOn')

    setIsTransliterationOn(value === 'on')
  }

  const getArabicFontName = async () => {
    const value = await getData('arabicFontName')

    if (value) {
      setArabicFontName(value)
    }
  }

  React.useEffect(() => {
    getTransliteration()
  }, [])

  React.useEffect(() => {
    getArabicFontName()
  }, [])

  const storeDarkMode = async (value) => {
    const boolValuesForDarkMode = value === true ? 'on' : 'off'

    await storeData('isDarkModeOn', boolValuesForDarkMode)
    dispatch({ payload: value, type: 'SET_DARK_MODE' })
  }
  const storeTransliteration = async (value) => {
    const boolValuesForTransliteration = value === true ? 'on' : 'off'

    await storeData('isTransliterationOn', boolValuesForTransliteration)
    dispatch({ payload: value, type: 'SET_TRANSLITERATION' })
  }

  return (
    <ScrollView style={{ ...sharedStyle.container }}>
      <Surface style={{ borderRadius: 10, marginBottom: 10, minHeight: 220, padding: 10 }} elevation={1}>
        <Text style={{ ...sharedStyle.arabicBody }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</Text>
        {isTransliterationOn ? (
          <Text style={sharedStyle.englishBody}>bismi allāhi alraḥmāni alraḥīmi</Text>
        ) : (
          <Text style={sharedStyle.englishBody}>{''}</Text>
        )}
        <Text style={sharedStyle.englishBody}>In the Name of Allah, the Most Gracious, the Most Merciful.</Text>
      </Surface>

      <SegmentButtonWithHeader
        title="Arabic Font"
        value={arabicFontName}
        onValueChange={(value) => {
          storeArabicFontName(value)
          setArabicFontName(value)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }}
        buttons={[
          {
            label: 'Uthman',
            value: 'uthman'
          },
          {
            label: 'Indopak',
            value: 'indopak'
          },
          {
            label: 'Amiri',
            value: 'amiri'
          },
          {
            label: 'Noto',
            value: 'noto'
          }
        ]}
      />

      <View style={{ alignItems: 'flex-start' }}>
        <Text variant="labelLarge" style={{ ...sharedStyle.element }}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkModeOn}
          style={{ marginTop: 0, paddingTop: 0 }}
          onValueChange={(value) => {
            storeDarkMode(value)
            setIsDarkModeOn(value)
          }}
        />
      </View>
      <Divider style={{ ...sharedStyle.divider }} />
      <View style={{ alignItems: 'flex-start' }}>
        <Text variant="labelLarge" style={{ ...sharedStyle.element }}>
          Transliteration
        </Text>
        <Switch
          style={{ marginTop: 0, paddingTop: 0 }}
          value={isTransliterationOn}
          onValueChange={(value) => {
            storeTransliteration(value)
            setIsTransliterationOn(value)
          }}
        />
        <Text variant={'bodySmall'} style={{ paddingTop: 5 }}>
          Transliteration changes Arabic letters into Latin letters. This helps people who can not read Arabic to
          understand and say Arabic words using familiar letters.
        </Text>
      </View>
    </ScrollView>
  )
}

export default TextSettings
