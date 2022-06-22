import { Chip } from '@mui/material'
import PropTypes from 'prop-types'

function MatchingIndicator(props) {
  const notMatchingMessage = `${props.entity} are not matching`
  const matchingMessage = `${props.entity} are matching`

  return props.firstCondition === props.secondCondition ? (
    <Chip label={matchingMessage} color="success" />
  ) : (
    <Chip label={notMatchingMessage} color="error" />
  )
}

MatchingIndicator.propTypes = {
  entity: PropTypes.string.isRequired,
  firstCondition: PropTypes.any.isRequired,
  secondCondition: PropTypes.any.isRequired
}

export default MatchingIndicator
