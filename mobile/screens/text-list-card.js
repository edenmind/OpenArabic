import PropTypes from 'prop-types'
import React from 'react'

import TextListCardGrammar from './text-list-card-grammar.js'
import TextListCardQuote from './text-list-card-quote.js'
import TextListCardText from './text-list-card-text.js'

export default function TextListCard(props) {
  const { text, compact, setShouldReload, navigation } = props

  switch (text.category) {
    case 'Quotes': {
      return <TextListCardQuote text={text} setShouldReload={setShouldReload} navigation={navigation} />
    }
    case 'Word': {
      return <TextListCardGrammar text={text} setShouldReload={setShouldReload} navigation={navigation} />
    }
    default: {
      return (
        <TextListCardText text={text} compact={compact} setShouldReload={setShouldReload} navigation={navigation} />
      )
    }
  }
}
TextListCard.propTypes = {
  compact: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  setShouldReload: PropTypes.func,
  text: PropTypes.object.isRequired
}
