import React, { useCallback } from 'react'
import { StyleSheet, Pressable, Animated } from 'react-native'
import { useSharedStyles } from '../styles/common.js'
import { prepareIngress, checkIfWithinLastThreeDays } from '../services/utility-service.js'
import SCREENS from '../constants/screens.js'
import { Text, Card, Divider, useTheme, IconButton, Chip } from 'react-native-paper'
import PropTypes from 'prop-types'
import { generateShare } from '../services/ui-services.js'

const animatedStyle = StyleSheet.create({
  animatedView: {
    transform: [{ scale: new Animated.Value(1) }]
  }
})

export default function TextListCardText({ setShouldReload, navigation, text }) {
  const scaleCard = useCallback(() => {
    Animated.timing(animatedStyle.animatedView.transform[0].scale, {
      useNativeDriver: true,
      toValue: 0.98,
      duration: 300
    }).start()
  }, [])

  const restoreCard = useCallback(() => {
    Animated.timing(animatedStyle.animatedView.transform[0].scale, {
      useNativeDriver: true,
      toValue: 1,
      duration: 300
    }).start()
  }, [])

  const subtitle = `${text.author} in #${text.category}`
  const footer = `${text.views} views · ${text.timeAgo} · ${text.readingTime}  `
  const english = text.texts?.english && prepareIngress(text.texts.english, 110)
  const arabic = text.texts?.arabic && prepareIngress(text.texts.arabic, 90)
  const theme = useTheme()

  const styles = StyleSheet.create({
    card: {
      margin: 10
    },
    cardAction: {
      marginRight: 10,
      paddingBottom: 17,
      paddingTop: 5
    },
    cardSubTitle: {
      color: theme.colors.outline
    },
    cardTitle: {
      color: theme.colors.onBackground,
      fontFamily: 'philosopher',
      paddingVertical: 5
    },
    divider: {
      marginVertical: 10
    }
  })

  return (
    <Card style={styles.card} testID="textCard" elevation={1}>
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
        <Animated.View style={animatedStyle.animatedView}>
          <Card.Cover defaultSource={require('../assets/default.png')} source={{ uri: text.image }} />
          <Card.Title
            title={text.title}
            subtitle={subtitle}
            titleVariant="headlineSmall"
            titleStyle={styles.cardTitle}
            subtitleVariant="labelMedium"
            subtitleStyle={styles.cardSubTitle}
            right={(props) => <IconButton {...props} icon="share-variant-outline" onPress={generateShare(text)} />}
          />
          <Card.Content>
            <Text style={useSharedStyles(theme).arabicBody}>{arabic}</Text>
            <Text variant="bodyLarge" style={useSharedStyles(theme).englishBody}>
              {english}
            </Text>
            <Divider style={styles.divider} />
          </Card.Content>
          <Card.Actions style={styles.cardAction}>
            {checkIfWithinLastThreeDays(text.createdAt) && (
              <Chip
                selectedColor={theme.colors.onTertiaryContainer}
                mode={'flat'}
                compact={true}
                style={{
                  position: 'absolute',
                  left: 13,
                  bottom: 10,
                  backgroundColor: theme.colors.tertiaryContainer
                }}
              >
                New ☀️
              </Chip>
            )}
            <Text variant="labelSmall" style={{ color: theme.colors.outline }}>
              {footer}
            </Text>
          </Card.Actions>
        </Animated.View>
      </Pressable>
    </Card>
  )
}

TextListCardText.propTypes = {
  navigation: PropTypes.object.isRequired,
  setShouldReload: PropTypes.func.isRequired,
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
    createdAt: PropTypes.string
  })
}
