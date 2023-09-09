import * as Haptics from 'expo-haptics'
import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Surface, Switch, useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import { SegmentButtonWithHeader } from '../components/segemented-button.js'
import { storeData, getData } from '../services/storage.js'
import { useSharedStyles } from '../styles/common.js'

const DEFAULT_ENGLISH_FONT_SIZE = '17'
const DEFAULT_ARABIC_FONT_SIZE = '19'
const DEFAULT_ARABIC_FONT_NAME = 'uthman'

export const TextSettings = () => {
  const [arabicFontName, setArabicFontName] = React.useState(DEFAULT_ARABIC_FONT_NAME)
  const [englishFontSizeValue, setEnglishSizeValue] = React.useState(DEFAULT_ENGLISH_FONT_SIZE)
  const [arabicFontSizeValue, setArabicSizeValue] = React.useState(DEFAULT_ARABIC_FONT_SIZE)
  const [isTransliterationOn, setIsTransliterationOn] = React.useState(true)
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const dispatch = useDispatch()

  const storeArabicFontName = async (value) => {
    dispatch({ payload: value, type: 'SET_ARABIC_FONT_NAME' })

    await storeData('arabicFontName', value)
  }

  const storeTransliteration = async (value) => {
    const boolValuesForTransliteration = value === true ? 'on' : 'off'
    dispatch({ payload: boolValuesForTransliteration, type: 'SET_TRANSLITERATION' })

    await storeData('isTransliterationOn', boolValuesForTransliteration)
  }

  const storeEnglishFontSize = async (value) => {
    dispatch({ payload: value, type: 'SET_ENGLISH_FONT_SIZE' })

    await storeData('englishFontSize', value)
  }

  const storeArabicFontSize = async (value) => {
    dispatch({ payload: value, type: 'SET_ARABIC_FONT_SIZE' })

    await storeData('arabicFontSize', value)
  }

  const getEnglishFontSize = async () => {
    const value = await getData('englishFontSize')

    if (value) {
      setEnglishSizeValue(value)
    }
  }

  const getArabicFontSize = async () => {
    const value = await getData('arabicFontSize')

    if (value) {
      setArabicSizeValue(value)
    }
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
    getEnglishFontSize()
  }, [])

  React.useEffect(() => {
    getArabicFontSize()
  }, [])

  React.useEffect(() => {
    getTransliteration()
  }, [])

  React.useEffect(() => {
    getArabicFontName()
  }, [])

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
        title="Arabic Font Size"
        value={arabicFontSizeValue}
        onValueChange={(value) => {
          storeArabicFontSize(value)
          setArabicSizeValue(value)
        }}
        buttons={[
          {
            label: 'Tiny',
            value: '14'
          },
          {
            label: 'Small',
            value: '16'
          },
          {
            label: 'Medium',
            value: '19'
          },
          {
            label: 'Large',
            value: '23'
          }
        ]}
      />
      <SegmentButtonWithHeader
        title="English Font Size"
        value={englishFontSizeValue}
        onValueChange={(value) => {
          storeEnglishFontSize(value)
          setEnglishSizeValue(value)
        }}
        buttons={[
          {
            label: 'Tiny',
            value: '15'
          },
          {
            label: 'Small',
            value: '16'
          },
          {
            label: 'Medium',
            value: '17'
          },
          {
            label: 'Large',
            value: '18'
          }
        ]}
      />
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
      </View>
      <Text variant={'bodySmall'} style={{ paddingTop: 5 }}>
        Transliteration changes Arabic letters into Latin letters. This helps people who can not read Arabic to
        understand and say Arabic words using familiar letters.
      </Text>
    </ScrollView>
  )
}

export default TextSettings
