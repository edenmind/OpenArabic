import PropTypes from 'prop-types'
import React from 'react'
import { View, Image } from 'react-native'
import { Text } from 'react-native-paper'

import icon from '../assets/logo.png'
import { pluralize } from '../services/ui-services.js'

export const CompletedView = (props) => (
  <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
    <Image source={icon} style={{ height: 100, width: 100 }} />
    <Text variant="titleLarge" style={{ paddingTop: 10, textAlign: 'center' }}>
      Well Done
    </Text>
    <Text variant="bodyMedium" style={{ textAlign: 'center', width: 250 }}>
      You have finished the {pluralize(props.localWords.length, 'word')} that you had to review, mashaAllah!
    </Text>
  </View>
)

CompletedView.propTypes = {
  localWords: PropTypes.array.isRequired
}
