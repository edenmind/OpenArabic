import { ENDPOINT, HOST } from '../constants/urls.js'
import { Button } from 'react-native-paper'
import React, { Fragment } from 'react'
import SCREENS from '../constants/screens.js'
import { Share } from 'react-native'
import TextDrawer from './text-drawer.js'
import UI from '../constants/ui.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from './text-tabs.js'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()
const selector = (state) => state.text

export default function Text() {
  const { text } = useSelector(selector)
  const shareLabel = 'Share'

  const onShare = async () => {
    try {
      await Share.share({
        message: text.title,
        url: `${HOST.frontend}/${ENDPOINT.texts}/${text.slug}`
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
          title: text.title,

          headerBackTitle: text.category,
          headerTitle: UI.null,

          headerRight: () => (
            <Fragment>
              <Button onPress={onShare}>{shareLabel}</Button>
            </Fragment>
          )
        }}
      />
    </Stack.Navigator>
  )
}
