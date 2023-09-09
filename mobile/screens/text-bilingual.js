import 'react-native-gesture-handler'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Divider, Text, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import Heading from './text-bilingual-heading.js'
import Sentences from './text-bilingual-sentences.js'
import FadeInView from '../components/fade-in-view.js'
import Spinner from '../components/spinner.js'
import { UI } from '../constants/ui.js'
import { generateTextError, generateShare } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

export default function TextBilingual() {
  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  return textLoading ? getContent() : <Spinner />

  function getContent() {
    return (
      <FadeInView style={{ flex: 1 }}>
        <ScrollView>
          <Heading heading={text} />
          <Sentences sentences={text.sentences} />
          <View style={sharedStyle.container}>
            <Button onPress={generateShare(text)}>{UI.share}</Button>
            <Divider style={{ opacity: 0 }} />
            <Button onPress={generateTextError(text)} textColor={theme.colors.error}>
              <Text style={{ color: theme.colors.error }}>{UI.report}</Text>
            </Button>
          </View>
        </ScrollView>
      </FadeInView>
    )
  }
}
