/* eslint-disable import/namespace */
import { ENDPOINT, HOST } from '../constants/urls'

import { Button } from 'react-native-paper'
import { COLORS } from '../constants/colors'
import React from 'react'
import { SCREENS } from '../constants/screens'
import { Share } from 'react-native'
import TextDrawer from './TextDrawer'
import { UI } from '../constants/ui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from './TextTabs'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()

export default function Text() {
  const selector = (state) => state.text
  const { text } = useSelector(selector)

  const onShare = async () => {
    try {
      await Share.share({
        message: text.title,
        url: `${HOST.backend}/${ENDPOINT.texts}/${text.id}`
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Stack.Navigator initialRouteName={SCREENS.home}>
      <Stack.Screen name={SCREENS.home} component={TextDrawer} options={{ headerShown: false }} />
      <Stack.Screen
        name={SCREENS.textScreen}
        component={defaultExport}
        options={{
          headerShown: true,
          headerTintColor: COLORS.darkOlive,
          title: text.title,
          headerBackTitle: text.category,
          headerTitle: UI.null,
          headerStyle: {
            backgroundColor: COLORS.shinyOlive
          },
          headerRight: () => (
            <Button icon="export-variant" mode="text" color={COLORS.darkOlive} onPress={onShare} />
          )
        }}
      />
    </Stack.Navigator>
  )
}
