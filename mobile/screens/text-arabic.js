import 'react-native-gesture-handler'
import { ScrollView, View, StyleSheet, Platform } from 'react-native'
import { Text, Chip, Divider, useTheme, Button, Surface } from 'react-native-paper'
import React from 'react'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'
import TextArabicWords from './text-arabic-words.js'
const textSelector = (state) => state.text
const textLoadSelector = (state) => state.textLoading
import ModalScrollView from '../components/modal-scroll-view.js'
import UI from '../constants/ui.js'

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
  const [englishTranslation, setEnglishTranslation] = React.useState('Tap to Translate! 👇🏽')
  const [explanation, setExplanation] = React.useState(<Text>Choose a Word first...</Text>)
  const [arabicWord, setArabicWord] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [explainIsVisible, setExplainIsVisible] = React.useState(false)
  const hideModal = () => setVisible(false)

  const { text } = useSelector(textSelector)
  const { textLoading } = useSelector(textLoadSelector)

  return textLoading ? (
    <>
      <Surface style={{ marginHorizontal: 10, marginTop: 10, borderRadius: 10 }} elevation={1}>
        <View style={{ flexDirection: 'row' }}>
          <Chip style={{ margin: 5, backgroundColor: undefined }} compact={true}>
            <Text variant="bodyLarge" style={{ color: theme.colors.onTertiaryContainer }}>
              {englishTranslation}
            </Text>
          </Chip>
          {explainIsVisible && (
            <Button
              icon="eye-outline"
              mode="text"
              style={{ margin: 5, position: 'absolute', right: 0 }}
              textColor={theme.colors.tertiary}
              onPress={() => {
                setVisible(true)
              }}
            >
              {UI.explain}
            </Button>
          )}
        </View>
      </Surface>
      <ScrollView style={{ ...sharedStyle.scrollView, marginLeft: 10 }}>
        <View style={styles.rowWrapper}>
          {
            <TextArabicWords
              text={text}
              setEnglishTranslation={setEnglishTranslation}
              setExplanation={setExplanation}
              setArabicWord={setArabicWord}
              setExplainIsVisible={setExplainIsVisible}
            />
          }
        </View>
      </ScrollView>
      <ModalScrollView visible={visible} hideModal={hideModal} title={arabicWord} content={explanation} />
    </>
  ) : (
    <Spinner />
  )
}

export default React.memo(TextArabic)
