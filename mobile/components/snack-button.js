import * as React from 'react'
import PropTypes from 'prop-types'
import { Snackbar, Text, useTheme } from 'react-native-paper'

const SnackButton = (props) => {
  const theme = useTheme()

  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props.onDismissSnackBar}
      duration={1500}
      style={{
        color: theme.colors.primary,
        backgroundColor: theme.colors.elevation.level5
      }}
    >
      <Text
        style={{
          color: theme.colors.primary,
          textAlign: 'center',
          fontWeight: '700'
        }}
        variant="titleMedium"
      >
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
