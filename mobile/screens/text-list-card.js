/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable putout/long-properties-destructuring */
import { prepareIngress } from '../services/utility-service.js'
import { Text, Card, Divider, Surface, Button, Chip } from 'react-native-paper'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import SCREENS from '../constants/screens.js'
import { StyleSheet, TouchableOpacity, Animated, Share } from 'react-native'
import { useSharedStyles } from '../styles/common.js'
import PlaySound from '../components/play-sound.js'
import { paperDarkTheme } from '../constants/paper-theme.js'

export default function TextListCard(props) {
  const sharedStyle = useSharedStyles()
  const [scaleValue] = useState(new Animated.Value(1))

  const scaleCard = () => {
    Animated.timing(scaleValue, {
      useNativeDriver: true,
      toValue: 0.95,
      duration: 300
    }).start()
  }

  const restoreCard = () => {
    Animated.timing(scaleValue, {
      useNativeDriver: true,
      toValue: 1,
      duration: 300
    }).start()
  }

  const onShare = async (arabic, english, hadithTitle) => {
    await Share.share({
      title: 'Open Arabic',
      message: `${arabic}\n\n"${english}"\n\n${hadithTitle} \n`,
      url: 'https://openarabic.app.link'
    })
  }

  const style = StyleSheet.create({
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
    }
  })

  const animatedStyle = {
    transform: [{ scale: scaleValue }]
  }

  //prepare the texts
  const subtitle = `${props.text.author} in #${props.text.category}`
  const footer = `${props.text.views} views · ${props.text.timeAgo} · ${props.text.readingTime}  `
  const english = props.text.texts.english && prepareIngress(props.text.texts.english, 125)
  const arabic = props.text.texts.arabic && prepareIngress(props.text.texts.arabic, 100)
  const hadithTitle = `${props.text.author} in ${props.text.source}`
  const englishHadith = '"' + props.text.texts.english + '"'

  if (props.text.category == 'Quotes') {
    //it is a hadith
    return (
      <Animated.View style={animatedStyle}>
        <Card style={style.card} testID="textCard" mode="elevated">
          <Surface elevation={2}>
            <Card.Content>
              <Chip
                compact={true}
                mode="outlined"
                style={{
                  marginTop: 15,
                  marginBottom: 5,
                  width: 67,
                  backgroundColor: paperDarkTheme.colors.onPrimary
                }}
              >
                <Text style={{ textAlign: 'left' }}>Quote</Text>
              </Chip>
              <Divider style={{ ...sharedStyle.dividerHidden }} />
              <Text variant="labelMedium" style={{ opacity: 0.7, paddingBottom: 10 }}>
                {hadithTitle}
              </Text>
              <Divider style={{ ...sharedStyle.dividerHidden }} />
              <Text style={{ ...sharedStyle.arabicBody }}>{props.text.texts.arabic}</Text>
              <Text variant="bodyLarge" style={sharedStyle.englishBody}>
                {englishHadith}
              </Text>
              <Text
                variant="labelSmall"
                style={{ marginTop: 10, marginBottom: 10, marginRight: 10, opacity: 0.7, textAlign: 'right' }}
              >
                {props.text.timeAgo}
              </Text>
              <Divider style={sharedStyle.divider} />
            </Card.Content>
            <Card.Actions style={{ ...style.cardAction, opacity: 1 }}>
              <PlaySound
                audioFileName={
                  'https://openarabic.ams3.digitaloceanspaces.com/audio/' + props.text.sentences[0].filename
                }
                buttonText={'LISTEN'}
              />
              <Button
                onPress={() => {
                  onShare(props.text.texts.arabic, props.text.texts.english, hadithTitle)
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
    <Card style={style.card} testID="textCard" mode="elevated">
      <Surface elevation={2}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={scaleCard}
          onPressOut={restoreCard}
          onPress={() => {
            props.setShouldReload(false)
            props.navigation.navigate(SCREENS.textScreen, {
              id: props.text.id
            })
          }}
        >
          <Animated.View style={animatedStyle}>
            <Card.Cover defaultSource={require('../assets/default.png')} source={{ uri: props.text.image }} />
            <Card.Title
              title={props.text.title}
              subtitle={subtitle}
              titleVariant="headlineSmall"
              titleStyle={style.cardTitle}
              subtitleVariant="labelMedium"
            />
            <Card.Content>
              <Text style={sharedStyle.arabicBody}>{arabic}</Text>
              <Text variant="bodyLarge" style={sharedStyle.englishBody}>
                {english}
              </Text>
              <Divider style={sharedStyle.divider} />
            </Card.Content>
            <Card.Actions style={style.cardAction}>
              <Text variant="labelSmall">{footer}</Text>
            </Card.Actions>
          </Animated.View>
        </TouchableOpacity>
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
