import { Audio } from 'expo-av'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Animated } from 'react-native'
import { Snackbar, Text, useTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  emoji: {
    fontSize: 70,
    paddingBottom: 10,
    textAlign: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  }
})

const TakbirCelebrate = ({ visible, onDismissSnackBar, text }) => {
  const theme = useTheme()
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const soundPlayedRef = useRef(false)
  const [sound, setSound] = useState()

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/takbir.mp3'))
    setSound(sound)
    await sound.playAsync()
  }

  useEffect(() => {
    if (visible && !soundPlayedRef.current) {
      playSound()
      soundPlayedRef.current = true
    } else if (!visible) {
      soundPlayedRef.current = false
    }

    return () => {
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [sound, visible])

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }, 100)
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      }, 300)
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      }, 500)

      // Start animation
      Animated.spring(scaleAnim, {
        friction: 3,
        toValue: 1,
        useNativeDriver: true
      }).start()

      // Auto-hide the Snackbar after 3 seconds plus 300ms animation time
      const timeout = setTimeout(() => {
        onDismissSnackBar()
      }, 3300)

      return () => clearTimeout(timeout)
    }

    scaleAnim.setValue(0.9)
  }, [scaleAnim, visible, onDismissSnackBar])

  const snackbarStyle = {
    backgroundColor: theme.colors.tertiaryContainer,
    color: theme.colors.onTertiaryContainer,
    transform: [{ scale: scaleAnim }]
  }

  const textStyle = {
    ...styles.text,
    color: theme.colors.onTertiaryContainer
  }

  return (
    <Animated.View style={snackbarStyle}>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} style={snackbarStyle} duration={3300}>
        <Text style={styles.emoji}>☝🏼</Text>
        <Text style={textStyle}>{text}</Text>
      </Snackbar>
    </Animated.View>
  )
}

TakbirCelebrate.propTypes = {
  onDismissSnackBar: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
}

export default TakbirCelebrate
