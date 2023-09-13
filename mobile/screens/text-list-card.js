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
  navigation: PropTypes.object.isRequired,
  setShouldReload: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired
}
