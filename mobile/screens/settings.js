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
    dispatch({ type: 'SET_ARABIC_FONT_NAME', payload: value })

    await storeData('arabicFontName', value)
  }

  const storeTransliteration = async (value) => {
    const boolValuesForTransliteration = value === true ? 'on' : 'off'
    dispatch({ type: 'SET_TRANSLITERATION', payload: boolValuesForTransliteration })

    await storeData('isTransliterationOn', boolValuesForTransliteration)
  }

  const storeEnglishFontSize = async (value) => {
    dispatch({ type: 'SET_ENGLISH_FONT_SIZE', payload: value })

    await storeData('englishFontSize', value)
  }

  const storeArabicFontSize = async (value) => {
    dispatch({ type: 'SET_ARABIC_FONT_SIZE', payload: value })

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
      <Surface style={{ padding: 10, borderRadius: 10, minHeight: 220, marginBottom: 10 }} elevation={1}>
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
            value: '14',
            label: 'Tiny'
          },
          {
            value: '16',
            label: 'Small'
          },
          {
            value: '19',
            label: 'Medium'
          },
          {
            value: '23',
            label: 'Large'
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
            value: '15',
            label: 'Tiny'
          },
          {
            value: '16',
            label: 'Small'
          },
          {
            value: '17',
            label: 'Medium'
          },
          {
            value: '18',
            label: 'Large'
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
            value: 'uthman',
            label: 'Uthman'
          },
          {
            value: 'indopak',
            label: 'Indopak'
          },
          {
            value: 'amiri',
            label: 'Amiri'
          },
          {
            value: 'noto',
            label: 'Noto'
          }
        ]}
      />

      <View style={{ alignItems: 'flex-start' }}>
        <Text variant="labelLarge" style={{ ...sharedStyle.element }}>
          Transliteration
        </Text>
        <Switch
          style={{ paddingTop: 0, marginTop: 0 }}
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
