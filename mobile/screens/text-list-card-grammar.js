import { Text, Card, useTheme, Chip, Divider } from 'react-native-paper'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { StyleSheet, Pressable, Animated } from 'react-native'
import SCREENS from '../constants/screens.js'
import { checkIfWithinLast36Hours } from '../services/utility-service.js'
import { useSharedStyles } from '../styles/common.js'

const animatedStyle = StyleSheet.create({
  animatedView: {
    transform: [{ scale: new Animated.Value(1) }]
  }
})

export default function TextListCardGrammar({ text, navigation, setShouldReload }) {
  const scaleCard = useCallback(() => {
    Animated.timing(animatedStyle.animatedView.transform[0].scale, {
      useNativeDriver: true,
      toValue: 0.99,
      duration: 100
    }).start()
  }, [])

  const restoreCard = useCallback(() => {
    Animated.timing(animatedStyle.animatedView.transform[0].scale, {
      useNativeDriver: true,
      toValue: 1,
      duration: 0
    }).start()
  }, [])
  const theme = useTheme()
  const styles = StyleSheet.create({
    card: {
      marginHorizontal: 5,
      marginVertical: 10
    },
    chip: {
      backgroundColor: theme.colors.elevation.transparent,
      borderBottomWidth: 4,
      borderColor: theme.colors.elevation.level5,
      borderWidth: 2,
      marginBottom: 5,
      marginTop: 15,

      width: 87
    },
    labelSmall: {
      color: theme.colors.outline,
      marginBottom: 15,
      marginTop: 10,
      paddingRight: 15,
      textAlign: 'right'
    }
  })

  const sharedStyle = useSharedStyles(theme)

  return (
    <Card style={styles.card}>
      <Pressable
        onPressIn={scaleCard}
        onPressOut={restoreCard}
        onPress={() => {
          setShouldReload(false)
          navigation.navigate(SCREENS.textGrammar, {
            grammar: text.grammar,
            arabic: text.arabic,
            english: text.english,
            filename: text.filename
          })
        }}
      >
        <Animated.View style={animatedStyle.animatedView}>
          <Card.Content>
            <Chip compact={true} style={styles.chip}>
              <Text
                style={{
                  ...sharedStyle.labelText
                }}
              >
                GRAMMAR
              </Text>
            </Chip>
            <Text
              style={{
                fontFamily: 'uthman',
                width: '97%',
                fontSize: 100,
                textAlign: 'center',
                color: theme.colors.secondary,
                paddingBottom: 15
              }}
            >
              {text.arabic}
            </Text>
            <Text
              style={{
                width: '97%',
                fontFamily: 'philosopher',
                fontSize: 25,
                textAlign: 'center',
                color: theme.colors.tertiary,
                paddingBottom: 50
              }}
            >
              {text.english.charAt(0).toUpperCase() + text.english.slice(1)}
            </Text>
            <Divider style={sharedStyle.divider} />
            {
              <Chip
                selectedColor={theme.colors.onTertiaryContainer}
                mode={'flat'}
                compact={true}
                style={{
                  position: 'absolute',
                  left: 25,
                  bottom: 8,
                  backgroundColor: theme.colors.tertiaryContainer
                }}
              >
                New ☀️
              </Chip>
            }
            <Text variant="labelSmall" style={styles.labelSmall}>
              {`${text.timeAgo} · 2 mins read`}
            </Text>
          </Card.Content>
        </Animated.View>
      </Pressable>
    </Card>
  )
}

TextListCardGrammar.propTypes = {
  navigation: PropTypes.object.isRequired,
  setShouldReload: PropTypes.func.isRequired,
  text: PropTypes.shape({
    filename: PropTypes.string,
    id: PropTypes.string,
    timeAgo: PropTypes.string,
    category: PropTypes.string,
    english: PropTypes.string,
    arabic: PropTypes.string,
    grammar: PropTypes.string,
    publishDate: PropTypes.string
  })
}
