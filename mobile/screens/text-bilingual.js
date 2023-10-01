import 'react-native-gesture-handler'

import React, { useState } from 'react'
import { RefreshControl, Share, ScrollView, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'

import Heading from './text-bilingual-heading.js'
import TextPractice from './text-practice.js'
import { ActionButton } from '../components/action-button.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import Spinner from '../components/spinner.js'
import { HOST, ENDPOINT } from '../constants/urls.js'
import { useSharedStyles } from '../styles/common.js'

const selector = (state) => state.text

export default function TextBilingual() {
  const { text } = useSelector(selector)

  const [visiblePractice, setVisiblePractice] = useState(false)

  const [refreshing, setRefreshing] = useState(false)
  const theme = useTheme()

  const sharedStyle = useSharedStyles(theme)

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

  return text.title == undefined ? (
    <Spinner />
  ) : (
    <>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Heading heading={text} />
        <View style={sharedStyle.container}>
          <ActionButton
            onPress={() => {
              setVisiblePractice(true)
            }}
            text="START LEARNING"
          />
        </View>
      </ScrollView>

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
