import { Divider, Text, SegmentedButtons, Surface } from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'

function TextSettingsScreen() {
  const [value, setValue] = React.useState('')

  const style = StyleSheet.create({
    element: {
      paddingBottom: 15,
      paddingTop: 15
    },
    scrollView: {
      direction: 'ltr',

      padding: 15,
      writingDirection: 'ltr'
    },
    surface: {
      marginTop: 15,
      padding: 15
    }
  })

  return (
    <ScrollView style={style.scrollView}>
      <Text variant="bodyMedium" style={style.element}>
        In the Name of Allah, the Most Gracious, the Most Merciful.
      </Text>

      <Text variant="bodyMedium" style={style.element}>
        بسم الله الرحمن الرحيم
      </Text>

      <Surface style={style.surface} elevation={2}>
        <Text variant="titleSmall" style={style.element}>
          English
        </Text>

        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'small',
              label: 'Small',
              size: 'small'
            },
            {
              value: 'medium',
              label: 'Medium'
            },
            {
              value: 'large',
              label: 'Large'
            }
          ]}
        />
      </Surface>

      <Surface style={style.surface} elevation={2}>
        <Text variant="titleSmall" style={style.element}>
          Arabic
        </Text>

        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'small',
              label: 'Small'
            },
            {
              value: 'medium',
              label: 'Medium'
            },
            {
              value: 'large',
              label: 'Large'
            }
          ]}
        />
      </Surface>
    </ScrollView>
  )
}

export default TextSettingsScreen
