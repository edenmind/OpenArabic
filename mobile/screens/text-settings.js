import { Text, SegmentedButtons, Surface, Switch } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { storeData, getData } from '../services/storage.js'
import { useDispatch } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'

function TextSettings() {
  const [arabicFontName, setArabicFontName] = React.useState('amiri') // default font
  const [englishFontSizeValue, setEnglishSizeValue] = React.useState(16) // default font size
  const [arabicFontSizeValue, setArabicSizeValue] = React.useState(20) // default font size
  const [isTransliterationOn, setIsTransliterationOn] = React.useState(false)
  const sharedStyle = useSharedStyles()
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

    if (value !== null) {
      setEnglishSizeValue(value)
    }
  }

  // get a value using getData
  const getArabicFontSize = async () => {
    const value = await getData('arabicFontSize')

    if (value !== null) {
      setArabicSizeValue(value)
    }
  }

  // get a value using getData
  const getTransliteration = async () => {
    const value = await getData('isTransliterationOn')

    if (value == 'on') {
      //we need to check for the string 'on' because the value is stored as a string
      setIsTransliterationOn(true)
    } else {
      setIsTransliterationOn(false)
    }
  }

  // get the arabic font name

  const getArabicFontName = async () => {
    const value = await getData('arabicFontName')

    if (value !== null) {
      setArabicFontName(value)
    }
  }

  // load the value when the component mounts
  React.useEffect(() => {
    getEnglishFontSize()
    getArabicFontSize()
    getTransliteration()
    getArabicFontName()
  }, [])

  const style = StyleSheet.create({
    element: {
      paddingBottom: 10,
      paddingTop: 10
    },
    segmentedButtons: {
      width: '25%'
    },
    surface: {
      padding: 15
    }
  })

  return (
    <View style={style.surface}>
      <Surface style={style.surface} elevation={2}>
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
        style={style.segmentedButtons}
        onValueChange={(value) => {
          storeArabicFontSize(value)
          setArabicSizeValue(value)
        }}
        buttons={[
          {
            value: '17',
            label: 'X-Small'
          },
          {
            value: '23',
            label: 'Small'
          },
          {
            value: '27',
            label: 'Medium'
          },
          {
            value: '33',
            label: 'Large'
          }
        ]}
      />

      <Text variant="labelMedium" style={style.element}>
        English Font Size
      </Text>

      <SegmentedButtons
        style={style.segmentedButtons}
        value={englishFontSizeValue}
        density="small"
        onValueChange={(value) => {
          storeEnglishFontSize(value)
          setEnglishSizeValue(value)
        }}
        buttons={[
          {
            value: '15',
            label: 'X-Small'
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
        style={style.segmentedButtons}
        value={arabicFontName}
        density="small"
        onValueChange={(value) => {
          storeArabicFontName(value)
          setArabicFontName(value)
        }}
        buttons={[
          {
            value: 'amiri',
            label: 'Amiri'
          },
          {
            value: 'amiriQuran',
            label: 'Colored'
          },
          {
            value: 'tajawal',
            label: 'Tajawal'
          },
          {
            value: 'noto',
            label: 'Noto'
          }
        ]}
      />

      <Text variant="labelMedium" style={style.element}>
        Transliteration
      </Text>
      <Switch
        value={isTransliterationOn}
        onValueChange={(value) => {
          storeTransliteration(value)
          setIsTransliterationOn(value)
        }}
      />
    </View>
  )
}

export default TextSettings
