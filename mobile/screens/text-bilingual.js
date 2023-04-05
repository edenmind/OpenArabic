import 'react-native-gesture-handler'
import Heading from './text-bilingual-heading.js'
import React from 'react'
import { ScrollView, View } from 'react-native'
import Sentences from './text-bilingual-sentences.js'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
import { Button, Divider } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import { generateError, generateShare } from '../services/ui-services.js'
import { paperDarkTheme } from '../constants/paper-theme.js'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

export default function TextBilingual() {
  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)
  const share = 'SHARE'
  const report = 'REPORT ERROR'
  const sharedStyle = useSharedStyles()

  return textLoading ? getContent() : <Spinner />

  function getContent() {
    return (
      <ScrollView>
        <Heading heading={text} />
        <Sentences sentences={text.sentences} />
        <View style={sharedStyle.container}>
          <Button mode="contained" onPress={generateShare(text)}>
            {share}
          </Button>
          <Divider style={sharedStyle.divider} />
          <Button
            mode="outlined"
            onPress={generateError(text)}
            style={{ borderColor: paperDarkTheme.colors.onErrorContainer }}
          >
            {report}
          </Button>
        </View>
      </ScrollView>
    )
  }
}
