import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { Animated, ScrollView } from 'react-native'
import { Divider, Text, useTheme, Banner } from 'react-native-paper'

import { EnglishArabicText } from '../components/english-arabic-text.js'
import { UI } from '../constants/ui.js'
import { useSharedStyles } from '../styles/common.js'

export const TextPracticeReview = ({
  isPlaying,
  setIsPlaying,
  setShowRepeat,
  showCelebration = false,
  showPlay = true,
  showRepeat,
  text
}) => {
  const theme = useTheme()
  const style = useSharedStyles(theme)

  // Animated value for the celebration banner
  const scaleAnim = useRef(new Animated.Value(0)).current

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
    <ScrollView style={style.scrollViewLTR}>
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

      <Text style={style.arabic}>{UI.basmallah}</Text>
      <Text style={{ ...style.englishBody, color: theme.colors.secondary, textAlign: 'center' }}>{text.author}</Text>
      <Text style={{ ...style.englishBody, color: theme.colors.secondary, textAlign: 'center' }}>{text.source}</Text>
      <Divider style={{ ...style.divider, opacity: 0, paddingBottom: 50 }} />

      {text.sentences.map((sentence, index) => (
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
    </ScrollView>
  )
}

TextPracticeReview.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  setShowRepeat: PropTypes.func.isRequired,
  showCelebration: PropTypes.bool,
  showPlay: PropTypes.bool,
  showRepeat: PropTypes.bool.isRequired,
  text: PropTypes.object.isRequired
}

export default TextPracticeReview
