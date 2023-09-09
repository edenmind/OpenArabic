import PropTypes from 'prop-types'
import React from 'react'
import { Text, Card, Divider, useTheme } from 'react-native-paper'

import { CategoryChip } from '../components/category-chip.js'
import { EnglishArabic } from '../components/english-arabic.js'
import PlaySound from '../components/play-sound.js'
import { PressableCard } from '../components/pressable-card.js'
import { UI } from '../constants/ui.js'
import { HOST } from '../constants/urls.js'
import { useSharedStyles } from '../styles/common.js'

export default function TextListCardQuote({ text }) {
  const hadithTitle = `${text.author.trim()} in ${text.source.trim()}`
  const englishHadith = `${text.texts.english}`

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

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
        <PlaySound audioFileNames={HOST + text.sentences[0].filename} buttonText={UI.play} />
      </Card.Actions>
    </>
  )

  return <PressableCard content={content} />
}

TextListCardQuote.propTypes = {
  text: PropTypes.shape({
    author: PropTypes.string.isRequired,
    sentences: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string.isRequired
      })
    ).isRequired,
    source: PropTypes.string.isRequired,
    texts: PropTypes.shape({
      arabic: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}
