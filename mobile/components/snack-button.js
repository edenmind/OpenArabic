import * as React from 'react'
import PropTypes from 'prop-types'
import { Snackbar, Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'

const SnackButton = (props) => {
  const theme = useTheme()

  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props.onDismissSnackBar}
      duration={props.duration}
      style={{
        color: theme.colors.primary,
        backgroundColor: theme.colors.tertiaryContainer
      }}
    >
      <Text
        style={{
          fontSize: 70,
          paddingBottom: 10,
          textAlign: 'center'
        }}
      >
        🏆
      </Text>

      <Text
        style={{
          color: theme.colors.tertiary,
          textAlign: 'center',
          fontSize: 20,
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
  duration: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  onDismissSnackBar: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}
