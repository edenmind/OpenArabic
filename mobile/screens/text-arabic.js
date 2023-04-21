import 'react-native-gesture-handler'
import { ScrollView, View, StyleSheet, Platform } from 'react-native'
import { Text, Chip, Divider, useTheme } from 'react-native-paper'
import React from 'react'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'
import TextArabicWords from './text-arabic-words.js'
const textSelector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: Platform.OS === 'android' ? 'row-reverse' : 'row',
    flexWrap: 'wrap',
    paddingBottom: 50
  }
})

function TextArabic() {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [englishTranslation, setEnglishTranslation] = React.useState('Tap for Translation and Audio...')

  const { text } = useSelector(textSelector)
  const { textLoading } = useSelector(textLoadSelector)

  return textLoading ? (
    <>
      <Chip icon="information" style={{ margin: 10 }}>
        <Text variant="bodyLarge">{englishTranslation}</Text>
      </Chip>
      <Divider style={sharedStyle.divider} />
      <ScrollView style={sharedStyle.scrollView}>
        <View style={styles.rowWrapper}>
          {<TextArabicWords text={text} setEnglishTranslation={setEnglishTranslation} />}
        </View>
      </ScrollView>
    </>
  ) : (
    <Spinner />
  )
}

export default React.memo(TextArabic)
