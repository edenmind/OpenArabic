/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable putout/long-properties-destructuring */
import { prepareIngress } from '../services/utility-service.js'
import { Text, Card, Divider, Surface, Button, Chip } from 'react-native-paper'
import PropTypes from 'prop-types'
import React, { useState, useCallback } from 'react'
import SCREENS from '../constants/screens.js'
import { StyleSheet, Pressable, Animated, Share } from 'react-native'
import { useSharedStyles } from '../styles/common.js'
import PlaySound from '../components/play-sound.js'
import { paperDarkTheme } from '../constants/paper-theme.js'
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
  cardTitle: {
    fontFamily: 'philosopher',
    paddingVertical: 5
  },
  chip: {
    backgroundColor: paperDarkTheme.colors.onPrimary,
    marginBottom: 5,
    marginTop: 15,
    width: 67
  },
  labelSmall: {
    marginBottom: 10,
    marginRight: 10,
    marginTop: 10,
    opacity: 0.7,
    textAlign: 'right'
  }
})

export default function TextListCard({ setShouldReload, navigation, text }) {
  const sharedStyle = useSharedStyles()
  const [scaleValue] = useState(new Animated.Value(1))

  const scaleCard = useCallback(() => {
    Animated.timing(scaleValue, {
      useNativeDriver: true,
      toValue: 0.98,
      duration: 300
    }).start()
  }, [scaleValue])

  const restoreCard = useCallback(() => {
    Animated.timing(scaleValue, {
      useNativeDriver: true,
      toValue: 1,
      duration: 300
    }).start()
  }, [scaleValue])

  const onShare = useCallback(async () => {
    const arabic = prepareIngress(text.texts.arabic, 100)
    const englishHadith = `"${text.texts.english}"`
    const hadithTitle = `${text.author} in ${text.source}`
    await Share.share({
      title: 'Open Arabic',
      message: `${arabic}\n\n"${englishHadith}"\n\n${hadithTitle} \n`,
      url: 'https://openarabic.app.link'
    })
  }, [text])

  const animatedStyle = {
    transform: [{ scale: scaleValue }]
  }

  //prepare the texts
  const subtitle = `${text.author} in #${text.category}`
  const footer = `${text.views} views · ${text.timeAgo} · ${text.readingTime}  `
  const english = text.texts.english && prepareIngress(text.texts.english, 125)
  const arabic = text.texts.arabic && prepareIngress(text.texts.arabic, 100)
  const hadithTitle = `${text.author} in ${text.source}`
  const englishHadith = `"${text.texts.english}"`

  if (text.category == 'Quotes') {
    //it is a hadith
    return (
      <Animated.View style={animatedStyle}>
        <Card style={styles.card} testID="textCard" mode="elevated">
          <Surface elevation={1}>
            <Card.Content>
              <Chip compact={true} mode="outlined" style={styles.chip}>
                <Text style={{ textAlign: 'left' }}>Quote</Text>
              </Chip>
              <Divider style={{ ...sharedStyle.dividerHidden }} />
              <Text variant="labelMedium" style={{ opacity: 0.7, paddingBottom: 10 }}>
                {hadithTitle}
              </Text>
              <Divider style={{ ...sharedStyle.dividerHidden }} />
              <Text style={{ ...sharedStyle.arabicBody }}>{text.texts.arabic}</Text>
              <Text variant="bodyLarge" style={sharedStyle.englishBody}>
                {englishHadith}
              </Text>
              <Text variant="labelSmall" style={styles.labelSmall}>
                {text.timeAgo}
              </Text>
              <Divider style={sharedStyle.divider} />
            </Card.Content>
            <Card.Actions style={{ ...styles.cardAction, opacity: 1 }}>
              <PlaySound
                audioFileName={'https://openarabic.ams3.digitaloceanspaces.com/audio/' + text.sentences[0].filename}
                buttonText={'LISTEN'}
              />
              <Button
                onPress={() => {
                  onShare(text.texts.arabic, text.texts.english, hadithTitle)
                }}
              >
                <Text style={{ color: paperDarkTheme.colors.onPrimary }}>SHARE</Text>
              </Button>
            </Card.Actions>
          </Surface>
        </Card>
      </Animated.View>
    )
  }

  return (
    <Card style={styles.card} testID="textCard" mode="elevated">
      <Surface elevation={1}>
        <Pressable
          onPressIn={scaleCard}
          onPressOut={restoreCard}
          onPress={() => {
            setShouldReload(false)
            navigation.navigate(SCREENS.textScreen, {
              id: text.id
            })
          }}
        >
          <Animated.View style={animatedStyle}>
            <Card.Cover defaultSource={require('../assets/default.png')} source={{ uri: text.image }} />
            <Card.Title
              title={text.title}
              subtitle={subtitle}
              titleVariant="headlineSmall"
              titleStyle={styles.cardTitle}
              subtitleVariant="labelMedium"
            />
            <Card.Content>
              <Text style={sharedStyle.arabicBody}>{arabic}</Text>
              <Text variant="bodyLarge" style={sharedStyle.englishBody}>
                {english}
              </Text>
              <Divider style={sharedStyle.divider} />
            </Card.Content>
            <Card.Actions style={styles.cardAction}>
              <Text variant="labelSmall">{footer}</Text>
            </Card.Actions>
          </Animated.View>
        </Pressable>
      </Surface>
    </Card>
  )
}

TextListCard.propTypes = {
  setShouldReload: PropTypes.func.isRequired,
  navigation: PropTypes.object,
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
    arabic: PropTypes.string
  })
}
