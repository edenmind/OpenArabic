/* eslint-disable import/namespace */
/* eslint-disable import/named */

import { List } from 'react-native-paper'
import PropTypes from 'prop-types'
import React from 'react'

const TextItem = (props) => {
  const titleTrimmed = props.title.trim()
  return (
    <List.Item
      title={titleTrimmed}
      testID="listItem"
      left={(props) => <List.Icon {...props} icon="text" />}
    />
  )
}

TextItem.propTypes = {
  title: PropTypes.string.isRequired
}

export default TextItem
