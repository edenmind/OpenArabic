import 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Button, Divider, Text, useTheme, AnimatedFAB } from 'react-native-paper'
import { useSelector } from 'react-redux'

import Heading from './text-bilingual-heading.js'
import Sentences from './text-bilingual-sentences.js'
import TextPractice from './text-practice.js'
import FadeInView from '../components/fade-in-view.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import Spinner from '../components/spinner.js'
import { UI } from '../constants/ui.js'
import { generateTextError, generateShare } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

export default function TextBilingual({ visible, animateFrom, style }) {
  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)
  const [visiblePractice, setVisiblePractice] = useState(false)

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const styles = StyleSheet.create({
    fabStyle: {
      bottom: 21,
      position: 'absolute',
      right: 21
    }
  })

  const [isExtended, setIsExtended] = React.useState(true)

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0

    setIsExtended(currentScrollPosition <= 0)
  }

  const fabStyle = { [animateFrom]: 1 }

  const numberOfWordsInText = text?.sentences?.reduce((acc, sentence) => acc + sentence?.words?.length, 0) ?? 0

  return textLoading ? getContent() : <Spinner />

  function getContent() {
    return (
      <>
        <FadeInView style={{ flex: 1 }}>
          <ScrollView onScroll={onScroll}>
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
          <AnimatedFAB
            icon={'brain'}
            label={`Practice ${numberOfWordsInText} words`}
            extended={isExtended}
            variant="surface"
            onPress={() => {
              setVisiblePractice(true)
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            }}
            visible={visible}
            animateFrom={'right'}
            iconMode={'dynamic'}
            uppercase={false}
            style={[styles.fabStyle, style, fabStyle]}
          />
        </FadeInView>

        <ModalScrollView
          visible={visiblePractice}
          content={<TextPractice />}
          hideModal={() => {
            setVisiblePractice(false)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          }}
        />
      </>
    )
  }
}

TextBilingual.propTypes = {
  animateFrom: PropTypes.string,
  style: PropTypes.any,
  visible: PropTypes.any
}
