/* eslint-disable import/namespace */
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoryDrawer from '../Categories/CategoryDrawer'
import TextScreen from './Text/TextScreen'
import { Button } from 'react-native-paper'
import { Share } from 'react-native'
import { useSelector } from 'react-redux'
import { COLORS } from '../../constants/colors'

const Stack = createNativeStackNavigator()

export default function TextNavigator() {
  const selector = (state) => state.text
  const { text } = useSelector(selector)
  const shareButtonText = 'Share'

  const onShare = async () => {
    try {
      await Share.share({
        message: text.title,
        url: 'https://app.openarabic.io/text/' + text.textId
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={CategoryDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TextScreen"
        component={TextScreen}
        options={{
          headerShown: true,
          headerTintColor: COLORS.lightOlive,
          title: text.title,
          headerBackTitle: text.category,
          headerTitle: '',
          headerStyle: {
            backgroundColor: COLORS.darkOlive
          },
          headerRight: () => (
            <Button
              icon="share"
              mode="text"
              color={COLORS.lightOlive}
              uppercase={false}
              onPress={onShare}>
              {shareButtonText}
            </Button>
          )
        }}
      />
    </Stack.Navigator>
  )
}
