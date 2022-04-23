import React, { Fragment } from 'react'

import { Box } from '@mui/system'
import PropTypes from 'prop-types'

function SingleTextSentence(props) {
  return props.sentences.map((sentence, index) => (
    <Fragment key={index}>
      <Box sx={{ fontSize: 'h4.fontSize', m: 2 }}>{sentence.arabic}</Box>
      <Box sx={{ m: 2 }}>{sentence.english}</Box>
    </Fragment>
  ))
}

SingleTextSentence.propTypes = {
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      english: PropTypes.string.isRequired,
      arabic: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default SingleTextSentence
