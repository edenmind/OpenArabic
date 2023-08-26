import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Snackbar, Text, useTheme } from 'react-native-paper'
import { StyleSheet, Animated } from 'react-native'
import * as Haptics from 'expo-haptics'

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

  useEffect(() => {
    if (visible) {
      // Trigger a haptic feedback with delay
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
        toValue: 1,
        friction: 3,
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
    color: theme.colors.onTertiaryContainer,
    backgroundColor: theme.colors.tertiaryContainer,
    transform: [{ scale: scaleAnim }]
  }

  const textStyle = {
    ...styles.text,
    color: theme.colors.onTertiaryContainer
  }

  return (
    <>
      <Animated.View style={snackbarStyle}>
        <Snackbar visible={visible} onDismiss={onDismissSnackBar} style={snackbarStyle} duration={3300}>
          <Text style={styles.emoji}>🏆</Text>
          <Text style={textStyle}>{text}</Text>
        </Snackbar>
      </Animated.View>
    </>
  )
}

TakbirCelebrate.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismissSnackBar: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default TakbirCelebrate
