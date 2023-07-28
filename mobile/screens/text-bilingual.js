import 'react-native-gesture-handler'
import Heading from './text-bilingual-heading.js'
import React from 'react'
import { ScrollView, View } from 'react-native'
import Sentences from './text-bilingual-sentences.js'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
import { Button, Divider, Text, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import { generateTextError, generateShare } from '../services/ui-services.js'
import FadeInView from '../components/fade-in-view.js'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading
import UI from '../constants/ui.js'

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
            <Button onPress={generateShare(text)} icon={'share-variant-outline'}>
              {UI.share}
            </Button>
            <Divider style={{ opacity: 0 }} />
            <Button onPress={generateTextError(text)} icon={'alert-circle-outline'} textColor={theme.colors.error}>
              <Text style={{ color: theme.colors.error }}>{UI.report}</Text>
            </Button>
          </View>
        </ScrollView>
      </FadeInView>
    )
  }
}
