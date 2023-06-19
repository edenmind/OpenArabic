import 'react-native-gesture-handler'
import { ScrollView, View, StyleSheet, Platform } from 'react-native'
import { Text, Chip, Divider, useTheme, Button } from 'react-native-paper'
import React from 'react'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'
import TextArabicWords from './text-arabic-words.js'
const textSelector = (state) => state.text
const textLoadSelector = (state) => state.textLoading
import ModalScrollView from '../components/modal-scroll-view.js'

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
  const [englishTranslation, setEnglishTranslation] = React.useState('Tap for Translation...')
  const [explanation, setExplanation] = React.useState(<Text>Choose a Word first...</Text>)

  const { text } = useSelector(textSelector)
  const { textLoading } = useSelector(textLoadSelector)
  const [visible, setVisible] = React.useState(false)
  const hideModal = () => setVisible(false)

  return textLoading ? (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 0,
          justifyContent: 'space-between',
          paddingLeft: 15,
          paddingRight: 25,
          marginTop: 10,
          marginHorizontal: 10
        }}
      >
        <Chip>
          <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>
            {englishTranslation}
          </Text>
        </Chip>
        <Button
          mode="text"
          icon={'eye-outline'}
          style={{ position: 'absolute', right: 0 }}
          textColor={theme.colors.tertiary}
          onPress={() => setVisible(true)}
        >
          EXPLAIN
        </Button>
      </View>
      <Divider style={{ marginHorizontal: 10, marginTop: 10 }} />
      <ScrollView style={sharedStyle.scrollView}>
        <View style={styles.rowWrapper}>
          {
            <TextArabicWords
              text={text}
              setEnglishTranslation={setEnglishTranslation}
              setExplanation={setExplanation}
            />
          }
        </View>
      </ScrollView>
      <ModalScrollView
        visible={visible}
        content={explanation ?? <Text>'No explanation available'</Text>}
        title={''}
        hideModal={hideModal}
        height="87%"
      />
    </>
  ) : (
    <Spinner />
  )
}

export default React.memo(TextArabic)
