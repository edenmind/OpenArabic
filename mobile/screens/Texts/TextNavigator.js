import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CategoryDrawer } from '../Categories/CategoryDrawer'
import TextScreen from './Text/TextScreen'
import { Button } from 'react-native-paper'
import { Share } from 'react-native'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()

export default function TextNavigator() {
  const selector = (state) => state.text
  const { text } = useSelector(selector)

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
          headerTintColor: '#e4f2d6',
          title: text.title,
          headerBackTitle: text.category,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#3e423a'
          },
          headerRight: () => (
            <Button
              icon="share"
              mode="text"
              color="#e4f2d6"
              uppercase={false}
              onPress={onShare}>
              Share
            </Button>
          )
        }}
      />
    </Stack.Navigator>
  )
}
