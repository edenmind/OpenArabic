import { Text, SegmentedButtons, Surface } from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { storeData, getData } from '../services/storage.js'

function TextSettingsScreen() {
  const [englishFontSizeValue, setEnglishSizeValue] = React.useState(16)
  const [arabicFontSizeValue, setArabicSizeValue] = React.useState(20)

  // store a value using storeData
  const storeEnglishFontSize = async (value) => {
    try {
      console.log(value)
      await storeData('englishFontSize', value)
    } catch (error) {
      console.log(error)
    }
  }

  // store a value using storeData
  const storeArabicFontSize = async (value) => {
    try {
      await storeData('arabicFontSize', value)
    } catch (error) {
      console.log(error)
    }
  }

  // get a value using getData
  const getEnglishFontSize = async () => {
    try {
      const value = await getData('englishFontSize')

      if (value !== null) {
        setEnglishSizeValue(value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // get a value using getData
  const getArabicFontSize = async () => {
    try {
      const value = await getData('arabicFontSize')

      if (value !== null) {
        setArabicSizeValue(value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // load the value when the component mounts
  React.useEffect(() => {
    getEnglishFontSize()
    getArabicFontSize()
  }, [])

  const style = StyleSheet.create({
    arabic: {
      direction: 'rtl',
      fontFamily: 'uthmanic',
      fontSize: arabicFontSizeValue,
      lineHeight: 40,
      writingDirection: 'rtl'
    },
    element: {
      paddingBottom: 10,
      paddingTop: 25
    },
    english: {
      fontFamily: 'philosopher',
      fontSize: englishFontSizeValue
    },
    scrollView: {
      direction: 'ltr',
      padding: 15,
      writingDirection: 'ltr'
    },
    segmentedButtons: {
      width: 100
    },
    surface: {
      marginTop: 15,
      padding: 15
    }
  })

  return (
    <ScrollView style={style.scrollView}>
      <Text variant="titleSmall">Example Text</Text>
      <Surface style={style.surface} elevation={2}>
        <Text variant="bodyMedium" style={style.english}>
          In the Name of Allah, the Most Gracious, the Most Merciful.
        </Text>
        <Text variant="bodyMedium" style={style.arabic}>
          بسم الله الرحمن الرحيم
        </Text>
      </Surface>

      <Text variant="titleSmall" style={style.element}>
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
            value: '14',
            label: 'X-Small'
          },
          {
            value: '15',
            label: 'Small'
          },
          {
            value: '16',
            label: 'Medium'
          },
          {
            value: '18',
            label: 'Large'
          }
        ]}
      />
      <Text variant="titleSmall" style={style.element}>
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
    </ScrollView>
  )
}

export default TextSettingsScreen
