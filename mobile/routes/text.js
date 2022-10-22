import { ENDPOINT, HOST } from '../constants/urls.js'
import { Button } from 'react-native-paper'
import COLORS from '../constants/colors.js'
import React, { Fragment } from 'react'
import SCREENS from '../constants/screens.js'
import { Share } from 'react-native'
import TextDrawer from './text-drawer.js'
import UI from '../constants/ui.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import defaultExport from './text-tabs.js'
import { useSelector } from 'react-redux'
import * as MailComposer from 'expo-mail-composer'

const Stack = createNativeStackNavigator()
const selector = (state) => state.text

export default function Text() {
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

  const onErrorReport = async () => {
    try {
      MailComposer.composeAsync({
        recipients: ['salam@edenmin.com'],
        subject: `Found an error in the text: ${text.title}`,
        body: `Please describe the error you found in the text: ${text.id}...`
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
            <Fragment>
              <Button icon="bug" mode="text" color={COLORS.darkOlive} onPress={onErrorReport} />
              <Button icon="export-variant" mode="text" color={COLORS.darkOlive} onPress={onShare} />
            </Fragment>
          )
        }}
      />
    </Stack.Navigator>
  )
}
