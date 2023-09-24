import 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { View, StyleSheet, RefreshControl, Share, ScrollView } from 'react-native'
import { Button, Text, useTheme, AnimatedFAB } from 'react-native-paper'
import { useSelector } from 'react-redux'

import Heading from './text-bilingual-heading.js'
import TextPractice from './text-practice.js'
import { EnglishArabic } from '../components/english-arabic.js'
import FadeInView from '../components/fade-in-view.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import Spinner from '../components/spinner.js'
import { UI } from '../constants/ui.js'
import { HOST, ENDPOINT } from '../constants/urls.js'
import { generateTextError } from '../services/ui-services.js'
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

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)

    try {
      await Share.share({
        message: `🔗 ${text.title} - ${text.author}`,
        title: `🔗 ${text.title} - ${text.author}`,
        url: `${HOST.frontend}/${ENDPOINT.texts}/${text.slug}`
      })
    } catch (error) {
      console.warn('Share Error:', error)
    }

    setRefreshing(false)
  }

  const fabStyle = { [animateFrom]: 1 }

  const renderedSentences = text.sentences?.map((sentence, index) => (
    <View key={index} style={[sharedStyle.container, { marginBottom: 0, marginTop: 0 }]}>
      <EnglishArabic sentence={sentence} />
    </View>
  ))

  return textLoading ? getContent() : <Spinner />

  function getContent() {
    return (
      <>
        <FadeInView style={{ flex: 1 }}>
          <ScrollView
            onScroll={onScroll}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <Heading heading={text} />

            {renderedSentences}
            <View style={{ ...sharedStyle.container, paddingBottom: 50, paddingTop: 15 }}>
              <Button onPress={generateTextError(text)} textColor={theme.colors.error}>
                <Text style={{ color: theme.colors.error }}>{UI.report}</Text>
              </Button>
            </View>
          </ScrollView>

          <AnimatedFAB
            icon={'brain'}
            label={'Practice'}
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
