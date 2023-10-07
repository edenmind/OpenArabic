import 'react-native-gesture-handler'

import * as Haptics from 'expo-haptics'
import React, { useState } from 'react'
import { RefreshControl, Share, ScrollView, View } from 'react-native'
import { useTheme, Button, Text } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

import Heading from './text-bilingual-heading.js'
import TextPractice from './text-practice.js'
import { ActionButton } from '../components/action-button.js'
import { EnglishArabic } from '../components/english-arabic.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import Spinner from '../components/spinner.js'
import { HOST, ENDPOINT } from '../constants/urls.js'
import { useSharedStyles } from '../styles/common.js'

const selector = (state) => state.text

export default function TextBilingual() {
  const { text } = useSelector(selector)
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const [content, setContent] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showRepeat, setShowRepeat] = useState(true)
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

  //loop through the text and use the EnglishArabic component to display the texts in a component called ReadText
  const ReadText = ({ isPlaying, setIsPlaying, showRepeat, setShowRepeat }) => {
    return text.sentences.map((sentence, index) => {
      return (
        <EnglishArabic
          key={index}
          autoStart={false}
          sentence={sentence}
          showAll={true}
          showRepeat={showRepeat}
          showPlay={true}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setShowRepeat={setShowRepeat}
        />
      )
    })
  }

  return text.title == undefined ? (
    <Spinner />
  ) : (
    <>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Heading heading={text} />
        <View style={sharedStyle.container}>
          <Button
            onPress={() => {
              setVisible(true)
              setContent(
                <ScrollView>
                  <ReadText
                    {...{
                      isPlaying,
                      setIsPlaying,
                      setShowRepeat,
                      showRepeat
                    }}
                  />
                </ScrollView>
              )
            }}
            style={{
              ...sharedStyle.buttonAnswer
            }}
          >
            <Text style={{ ...sharedStyle.actionTextPrimary }}>READ</Text>
          </Button>

          <ActionButton
            onPress={() => {
              setContent(<TextPractice />)
              setVisible(true)
              setIsPlaying(true)
              dispatch({
                payload: true,
                type: 'SET_AUDIO'
              })
            }}
            text="PRACTICE"
          />
        </View>
      </ScrollView>

      <ModalScrollView
        visible={visible}
        content={content}
        hideModal={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          setVisible(false)
          setIsPlaying(false)
          dispatch({
            payload: false,
            type: 'SET_AUDIO'
          })
        }}
      />
    </>
  )
}
