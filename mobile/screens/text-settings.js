import { Text, SegmentedButtons, Surface, Switch, useTheme } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { storeData, getData } from '../services/storage.js'
import { useDispatch } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'
import { ScrollView } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'

const style = StyleSheet.create({
  element: {
    paddingBottom: 10,
    paddingTop: 15
  },
  surface: {
    padding: 15
  }
})

const DEFAULT_ENGLISH_FONT_SIZE = '17'
const DEFAULT_ARABIC_FONT_SIZE = '19'
const DEFAULT_ARABIC_FONT_NAME = 'uthman'

function TextSettings() {
  const [arabicFontName, setArabicFontName] = React.useState(DEFAULT_ARABIC_FONT_NAME) // default font
  const [englishFontSizeValue, setEnglishSizeValue] = React.useState(DEFAULT_ENGLISH_FONT_SIZE) // default font size
  const [arabicFontSizeValue, setArabicSizeValue] = React.useState(DEFAULT_ARABIC_FONT_SIZE) // default font size
  const [isTransliterationOn, setIsTransliterationOn] = React.useState(true)
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const dispatch = useDispatch()

  // store arabic font name
  const storeArabicFontName = async (value) => {
    dispatch({ type: 'SET_ARABIC_FONT_NAME', payload: value })

    await storeData('arabicFontName', value)
  }

  // store a value using storeData
  const storeTransliteration = async (value) => {
    // we need to convert the value to a string before storing it
    const boolValuesForTransliteration = value === true ? 'on' : 'off'
    dispatch({ type: 'SET_TRANSLITERATION', payload: boolValuesForTransliteration })

    await storeData('isTransliterationOn', boolValuesForTransliteration)
  }

  // store a value using storeData
  const storeEnglishFontSize = async (value) => {
    // store the value in the store with dispatch

    dispatch({ type: 'SET_ENGLISH_FONT_SIZE', payload: value })

    await storeData('englishFontSize', value)
  }

  // store a value using storeData
  const storeArabicFontSize = async (value) => {
    // store the value in the store with dispatch

    dispatch({ type: 'SET_ARABIC_FONT_SIZE', payload: value })

    await storeData('arabicFontSize', value)
  }

  // get a value using getData
  const getEnglishFontSize = async () => {
    const value = await getData('englishFontSize')

    if (value) {
      setEnglishSizeValue(value)
    }
  }

  // get a value using getData
  const getArabicFontSize = async () => {
    const value = await getData('arabicFontSize')

    if (value) {
      setArabicSizeValue(value)
    }
  }

  // get a value using getData
  const getTransliteration = async () => {
    const value = await getData('isTransliterationOn')

    setIsTransliterationOn(value === 'on')
  }

  // get the arabic font name

  const getArabicFontName = async () => {
    const value = await getData('arabicFontName')

    if (value) {
      setArabicFontName(value)
    }
  }

  // load the value when the component mounts
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
    <ScrollView style={style.surface}>
      <Surface style={{ ...style.surface, borderRadius: 10 }} elevation={1}>
        <Text style={sharedStyle.arabicBody}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</Text>
        {isTransliterationOn ? (
          <Text style={sharedStyle.englishBody}>bismi allāhi alraḥmāni alraḥīmi</Text>
        ) : (
          <Text style={sharedStyle.englishBody}>{''}</Text>
        )}
        <Text style={sharedStyle.englishBody}>In the Name of Allah, the Most Gracious, the Most Merciful.</Text>
      </Surface>
      <Text variant="labelMedium" style={style.element}>
        Arabic Font Size
      </Text>
      <SegmentedButtons
        value={arabicFontSizeValue}
        onValueChange={(value) => {
          storeArabicFontSize(value)
          setArabicSizeValue(value)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
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
      <Text variant="labelMedium" style={style.element}>
        English Font Size
      </Text>
      <SegmentedButtons
        value={englishFontSizeValue}
        onValueChange={(value) => {
          storeEnglishFontSize(value)
          setEnglishSizeValue(value)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
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
      <Text variant="labelMedium" style={style.element}>
        Arabic Font
      </Text>
      <SegmentedButtons
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
        <Text variant="labelMedium" style={style.element}>
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
