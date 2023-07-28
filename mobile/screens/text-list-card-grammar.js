import { Text, Card, Button, useTheme, Chip, Divider } from 'react-native-paper'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { StyleSheet, Animated } from 'react-native'
import SCREENS from '../constants/screens.js'
import { checkIfWithinLast36Hours } from '../services/utility-service.js'
import { useSharedStyles } from '../styles/common.js'
export default function TextListCardGrammar({ text, navigation, setShouldReload }) {
  const [scaleValue] = useState(new Animated.Value(1))
  const theme = useTheme()
  const styles = StyleSheet.create({
    card: {
      margin: 10
    },
    cardAction: {
      justifyContent: 'space-between',
      margin: 10
    },
    labelSmall: {
      color: theme.colors.outline,
      marginBottom: 10,
      marginTop: 10,
      textAlign: 'right'
    }
  })

  const animatedStyle = {
    transform: [{ scale: scaleValue }]
  }

  const sharedStyle = useSharedStyles(theme)

  return (
    <Animated.View style={animatedStyle}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text
            style={{
              fontFamily: 'uthman',
              width: '97%',
              fontSize: 100,
              textAlign: 'center',
              color: theme.colors.secondary
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
            {text.english}
          </Text>
          <Text variant="labelSmall" style={styles.labelSmall}>
            {`${text.timeAgo} · 2 mins read`}
          </Text>
          <Divider style={sharedStyle.divider} />
        </Card.Content>
        <Card.Actions style={styles.cardAction}>
          {checkIfWithinLast36Hours(text.publishDate) && (
            <Chip
              selectedColor={theme.colors.onTertiaryContainer}
              mode={'flat'}
              compact={true}
              style={{
                position: 'absolute',
                left: 0,
                bottom: 10,
                backgroundColor: theme.colors.tertiaryContainer
              }}
            >
              New ☀️
            </Chip>
          )}
          <Button
            onPress={() => {
              setShouldReload(false)
              navigation.navigate(SCREENS.textGrammar, {
                grammar: text.grammar,
                arabic: text.arabic,
                english: text.english
              })
            }}
          >
            View Grammar Lesson
          </Button>
        </Card.Actions>
      </Card>
    </Animated.View>
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
