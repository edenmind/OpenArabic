import { prepareIngress, checkIfWithinLast36Hours } from '../services/utility-service.js'
import { Text, Card, Divider, Button, Chip, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import React, { useState, useCallback } from 'react'
import { StyleSheet, Animated, Share } from 'react-native'
import { useSharedStyles } from '../styles/common.js'
import PlaySound from '../components/play-sound.js'

export default function TextListCardQuote({ text }) {
  const [scaleValue] = useState(new Animated.Value(1))
  const hadithTitle = `${text.author.trim()} in ${text.source.trim()}`
  const englishHadith = `${text.texts.english}`

  const theme = useTheme()
  const styles = StyleSheet.create({
    card: {
      margin: 10
    },
    cardAction: {
      marginRight: 10,
      opacity: 0.7,
      paddingBottom: 15,
      paddingTop: 5
    },
    chip: {
      marginBottom: 5,
      width: 67
    },
    labelSmall: {
      color: theme.colors.outline,
      marginBottom: 10,
      marginRight: 10,
      marginTop: 10,
      opacity: 0.7,
      textAlign: 'right'
    }
  })

  const onShare = useCallback(async () => {
    const arabic = prepareIngress(text.texts.arabic, 100)
    await Share.share({
      title: 'Open Arabic',
      message: `${arabic}\n\n${englishHadith}\n\n${hadithTitle} \n`,
      url: 'https://openarabic.app.link'
    })
  }, [englishHadith, hadithTitle, text.texts.arabic])

  const animatedStyle = {
    transform: [{ scale: scaleValue }]
  }

  const sharedStyle = useSharedStyles(theme)

  return (
    <Animated.View style={animatedStyle}>
      <Card style={styles.card} testID="textCard" mode="elevated">
        <Card.Content>
          <Chip compact={true} style={styles.chip}>
            <Text>Quote</Text>
          </Chip>
          <Divider style={{ ...sharedStyle.dividerHidden }} />
          <Text variant="labelMedium" style={{ color: theme.colors.outline, paddingBottom: 10 }}>
            {hadithTitle}
          </Text>
          <Divider style={{ ...sharedStyle.dividerHidden }} />
          <Text style={{ ...sharedStyle.arabicBody }}>{text.texts.arabic}</Text>
          <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
            {englishHadith}
          </Text>
          <Text variant="labelSmall" style={styles.labelSmall}>
            {text.timeAgo}
          </Text>
          <Divider style={sharedStyle.divider} />
        </Card.Content>
        <Card.Actions style={{ ...styles.cardAction, opacity: 1 }}>
          {checkIfWithinLast36Hours(text.publishAt) && (
            <Chip
              selectedColor={theme.colors.onTertiaryContainer}
              mode={'flat'}
              compact={true}
              style={{
                position: 'absolute',
                left: 10,
                bottom: 20,
                backgroundColor: theme.colors.tertiaryContainer
              }}
            >
              New ☀️
            </Chip>
          )}
          <PlaySound
            audioFileNames={`https://openarabic.ams3.digitaloceanspaces.com/audio/${text.sentences[0].filename}`}
            buttonText={'Play'}
          />
          <Button onPress={onShare}>Share</Button>
        </Card.Actions>
      </Card>
    </Animated.View>
  )
}

TextListCardQuote.propTypes = {
  text: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    views: PropTypes.string,
    timeAgo: PropTypes.string,
    readingTime: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string,
    texts: PropTypes.object,
    category: PropTypes.string,
    sentences: PropTypes.array,
    english: PropTypes.string,
    arabic: PropTypes.string,
    publishAt: PropTypes.string
  })
}
