/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable putout/long-properties-destructuring */
import PropTypes from 'prop-types'
import React from 'react'
import TextListCardQuote from './text-list-card-quote.js'
import TextListCardText from './text-list-card-text.js'

export default function TextListCard({ setShouldReload, navigation, text }) {
  const isQuote = text.category === 'Quotes'

  return isQuote ? (
    <TextListCardQuote text={text} />
  ) : (
    <TextListCardText text={text} setShouldReload={setShouldReload} navigation={navigation} />
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
