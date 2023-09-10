import PropTypes from 'prop-types'
import React from 'react'

import TextListCardGrammar from './text-list-card-grammar.js'
// import TextListCardQuote from './text-list-card-quote.js'
import TextListCardText from './text-list-card-text.js'

export default function TextListCard({ setShouldReload, navigation, text }) {
  switch (text.category) {
    case 'Quotes': {
      // This will be based on word inshaA
      return //<TextListCardQuote text={text} />
    }
    case 'Word': {
      return <TextListCardGrammar text={text} setShouldReload={setShouldReload} navigation={navigation} />
    }
    default: {
      return <TextListCardText text={text} setShouldReload={setShouldReload} navigation={navigation} />
    }
  }
}
TextListCard.propTypes = {
  navigation: PropTypes.object,
  setShouldReload: PropTypes.func.isRequired,
  text: PropTypes.shape({
    arabic: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    english: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    readingTime: PropTypes.string,
    sentences: PropTypes.array,
    slug: PropTypes.string,
    source: PropTypes.string,
    texts: PropTypes.object,
    timeAgo: PropTypes.string,
    title: PropTypes.string,
    views: PropTypes.string
  })
}
