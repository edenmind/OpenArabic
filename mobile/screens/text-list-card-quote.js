import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { Text, Card, Divider, useTheme } from 'react-native-paper'

import { CategoryChip } from '../components/category-chip.js'
import { EnglishArabicText } from '../components/english-arabic-text.js'
import { PressableCard } from '../components/pressable-card.js'
import { HOST } from '../constants/urls.js'
import { useSharedStyles } from '../styles/common.js'

export default function TextListCardQuote({ text }) {
  const { author, source, sentences, texts } = text
  const { arabic, english } = texts
  const hadithTitle = `${author} in ${source}`

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const audioFileName = useMemo(() => HOST + sentences[0].filename, [sentences])

  const sentenceForComponent = {
    arabic,
    english,
    filename: audioFileName
  }

  const content = (
    <>
      <Card.Content>
        <CategoryChip category="QUOTE" />
        <Divider style={sharedStyle.dividerHidden} />
        <EnglishArabicText sentence={sentenceForComponent} />
      </Card.Content>
      <Card.Actions>
        <Text variant="labelMedium" style={{ color: theme.colors.outline, paddingBottom: 10 }}>
          {hadithTitle}
        </Text>
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
