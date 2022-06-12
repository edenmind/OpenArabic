import { Box } from '@mui/system'
import { Fragment } from 'react'
import PropTypes from 'prop-types'

function TextListIdSentences(properties) {
  return properties.sentences.map((sentence, index) => (
    <Fragment key={index}>
      <Box sx={{ fontSize: 'h4.fontSize', m: 2 }}>{sentence.arabic}</Box>
      <Box sx={{ m: 2 }}>{sentence.english}</Box>
    </Fragment>
  ))
}

TextListIdSentences.propTypes = {
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      english: PropTypes.string.isRequired,
      arabic: PropTypes.string.isRequired
    })
  ).isRequired
}

export default TextListIdSentences
