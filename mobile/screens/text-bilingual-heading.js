import { LinearGradient } from 'expo-linear-gradient'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { Text, useTheme, Checkbox } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

export default function TextBilingualHeading({ heading }) {
  const { image } = heading

  const theme = useTheme()
  const style = useSharedStyles(theme)
  const [checked, setChecked] = React.useState(true)

  return (
    <>
      <View>
        <Image source={{ uri: image }} style={style.image} />
        <LinearGradient
          colors={['transparent', theme.colors.background]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <Text variant="labelMedium" style={{ ...style.reading, paddingLeft: 15, textAlign: 'left' }}>
        Setup Practice Session
      </Text>

      <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 15, marginVertical: 10 }}>
        <Checkbox
          uncheckedColor="red"
          checkedColor="green"
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked)
          }}
        />
        <View>
          <Text variant="headlineSmall">Listening</Text>
          <Text variant="labelLarge">This is a small explanatory note.</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 15, marginVertical: 10 }}>
        <Checkbox
          uncheckedColor="red"
          checkedColor="green"
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked)
          }}
        />
        <View>
          <Text variant="headlineSmall">Reading</Text>
          <Text variant="labelLarge">This is another small explanatory note.</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', marginHorizontal: 15, marginVertical: 10 }}>
        <Checkbox
          uncheckedColor="red"
          checkedColor="green"
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked)
          }}
        />
        <View>
          <Text variant="headlineSmall">Vocabulary</Text>
          <Text variant="labelLarge">This is yet another small explanatory note.</Text>
        </View>
      </View>
    </>
  )
}

TextBilingualHeading.propTypes = {
  heading: PropTypes.shape({
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired
  })
}
