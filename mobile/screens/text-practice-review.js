import * as Haptics from 'expo-haptics'
import { LinearGradient } from 'expo-linear-gradient'
import PropTypes from 'prop-types'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, View, Image, StyleSheet, FlatList } from 'react-native'
import { Divider, Text, useTheme, Banner } from 'react-native-paper'
import { useSelector } from 'react-redux'

import TextListCard from './text-list-card'
import { EnglishArabicText } from '../components/english-arabic-text.js'
import Spinner from '../components/spinner'
import { UI } from '../constants/ui.js'
import { useSharedStyles } from '../styles/common.js'

const selector = (state) => state.texts

const TextPracticeReview = ({
  isPlaying,
  navigation,
  setIsPlaying,
  setShowRepeat,
  showCelebration = false,
  showPlay = true,
  showRepeat,
  text
}) => {
  const theme = useTheme()
  const style = useSharedStyles(theme)

  const scaleAnim = useRef(new Animated.Value(0)).current
  const { texts } = useSelector(selector)
  const textsInCategory = texts.filter((t) => t.category === text.category)
  const textsInCategoryRandomised = textsInCategory.sort(() => Math.random() - 0.5)

  const moreFromAuthor = texts.filter((t) => t.author === text.author)
  const moreFromAuthorRandomised = moreFromAuthor.sort(() => Math.random() - 0.5)

  // eslint-disable-next-line no-unused-vars
  const [isReloadRequired, setIsReloadRequired] = useState(true)

  const renderItemHorizontal = useCallback(
    ({ item }) => (
      <View style={{ width: 350 }}>
        <TextListCard compact={false} text={item} navigation={navigation} setShouldReload={setIsReloadRequired} />
      </View>
    ),
    []
  )

  // Run the animation when showCelebration is true
  useEffect(() => {
    if (!showCelebration) {
      return
    }
    // Define a sequence of haptic feedbacks
    const triggerHapticSequence = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 150)
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 300)
    }

    // Trigger the haptic sequence
    triggerHapticSequence()

    // Run the animation
    Animated.timing(scaleAnim, {
      duration: 500,
      toValue: 1,
      useNativeDriver: true
    }).start()
  }, [showCelebration, scaleAnim])

  return (
    <ScrollView>
      {showCelebration && (
        <Animated.View
          style={{
            opacity: scaleAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <Banner
            visible={true}
            actions={[]}
            icon={({ size }) => (
              <Animated.Image
                source={require('../assets/icon.png')}
                style={{
                  height: size,
                  transform: [{ scale: scaleAnim }],
                  width: size
                }}
              />
            )}
            style={{
              backgroundColor: theme.colors.elevation.level1,
              borderRadius: 5
            }}
          >
            <Text style={{ color: theme.colors.onSurface, textAlign: 'left' }} variant="titleMedium">
              Alhamdulillah!
            </Text>

            <Text style={{ color: theme.colors.secondary, textAlign: 'left' }} variant="bodyMedium">
              {UI.space}
              You've completed the exercise. Challenge yourself to read the text in pure Arabic. Tap any Arabic word for
              its English translation.
            </Text>
          </Banner>
        </Animated.View>
      )}

      <View>
        <Image source={{ uri: text.image }} style={style.image} />
        <LinearGradient
          colors={['transparent', theme.colors.background]}
          start={{ x: 0.5, y: 0.7 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <Text style={style.title} variant={'headlineMedium'}>
        {text.title}
      </Text>
      <Text
        style={[
          style.englishBody,
          {
            color: theme.colors.secondary,
            textAlign: 'center'
          }
        ]}
      >
        {text.author}
      </Text>
      <Text
        style={[
          style.englishBody,
          {
            color: theme.colors.secondary,
            textAlign: 'center'
          }
        ]}
      >
        {text.source}
      </Text>

      <View style={style.container}>
        <Text style={{ ...style.arabic, paddingBottom: 0 }}>{UI.basmallah}</Text>
        <Divider style={{ ...style.divider, opacity: 0 }} />

        {text.sentences &&
          text.sentences.map((sentence, index) => (
            <EnglishArabicText
              key={index}
              autoStart={false}
              sentence={sentence}
              showAll={true}
              showRepeat={showRepeat}
              showPlay={showPlay}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setShowRepeat={setShowRepeat}
            />
          ))}
      </View>

      <Fragment>
        <Text style={{ ...style.englishHeading, paddingLeft: 15 }}>More in {text.category}</Text>
        <FlatList
          data={textsInCategoryRandomised}
          renderItem={renderItemHorizontal}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Spinner />}
          horizontal={true}
        />
        <Divider style={{ margin: 20, opacity: 0 }} />
      </Fragment>

      <Fragment>
        <Text style={{ ...style.englishHeading, paddingLeft: 15 }}>More from {text.author}</Text>
        <FlatList
          data={moreFromAuthorRandomised}
          renderItem={renderItemHorizontal}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Spinner />}
          horizontal={true}
        />
        <Divider style={{ margin: 20, opacity: 0 }} />
      </Fragment>
    </ScrollView>
  )
}

TextPracticeReview.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setShowRepeat: PropTypes.func.isRequired,
  showCelebration: PropTypes.bool,
  showPlay: PropTypes.bool,
  showRepeat: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}

export default TextPracticeReview
