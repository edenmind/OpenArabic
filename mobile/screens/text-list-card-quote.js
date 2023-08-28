import { prepareIngress } from '../services/utility-service.js'
import { Text, Card, Divider, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { Share } from 'react-native'
import { useSharedStyles } from '../styles/common.js'
import PlaySound from '../components/play-sound.js'
import { CategoryChip } from '../components/category-chip.js'
import { PressableCard } from '../components/pressable-card.js'
import { EnglishArabic } from '../components/english-arabic.js'
import { UI } from '../constants/ui.js'
import { AnswerButton } from '../components/answer-button.js'

export default function TextListCardQuote({ text }) {
  const hadithTitle = `${text.author.trim()} in ${text.source.trim()}`
  const englishHadith = `${text.texts.english}`

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const onShare = useCallback(async () => {
    const arabic = prepareIngress(text.texts.arabic, 100)
    await Share.share({
      title: 'Open Arabic',
      message: `${arabic}\n\n${englishHadith}\n\n${hadithTitle} \n`,
      url: 'https://openarabic.app.link'
    })
  }, [englishHadith, hadithTitle, text.texts.arabic])

  const content = (
    <>
      <Card.Content>
        <CategoryChip category="QUOTE" />
        <Divider style={{ ...sharedStyle.dividerHidden }} />

        <EnglishArabic arabic={text.texts.arabic} english={englishHadith} />
        <Text variant="labelMedium" style={{ color: theme.colors.outline, paddingBottom: 10 }}>
          {hadithTitle}
        </Text>
      </Card.Content>
      <Card.Actions>
        <PlaySound
          audioFileNames={`https://openarabic.ams3.digitaloceanspaces.com/audio/${text.sentences[0].filename}`}
          buttonText={UI.play}
        />
      </Card.Actions>
    </>
  )

  return <PressableCard content={content} />
}

TextListCardQuote.propTypes = {
  text: PropTypes.shape({
    author: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    texts: PropTypes.shape({
      english: PropTypes.string.isRequired,
      arabic: PropTypes.string.isRequired
    }).isRequired,
    sentences: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
}
