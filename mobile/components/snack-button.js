import * as React from 'react'
import PropTypes from 'prop-types'
import { Snackbar, Text, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'

const SnackButton = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles()

  return (
    <Snackbar theme={theme} visible={props.visible} onDismiss={props.onDismissSnackBar} duration={350}>
      <Text style={{ ...sharedStyle.englishBody, color: theme.colors.onPrimary }} variant="headlineLarge">
        {props.text}
      </Text>
    </Snackbar>
  )
}

export default SnackButton

SnackButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismissSnackBar: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}
