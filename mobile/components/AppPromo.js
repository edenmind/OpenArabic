import React, { Fragment } from 'react'
import { Linking, Platform } from 'react-native'
import { Button, Divider } from 'react-native-paper'

export default function AppPromo() {
  if (Platform.OS === 'web') {
    return (
      <Fragment>
        <Button
          icon="share"
          mode="contained"
          color="#a4cfbe"
          uppercase={false}
          onPress={() => {
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.edenmind.OpenArabic&gl=SE'
            )
          }}>
          Get in on Google Play
        </Button>

        <Divider />

        <Button
          icon="share"
          mode="contained"
          color="#a4cfbe"
          uppercase={false}
          onPress={() => {
            Linking.openURL(
              'https://apps.apple.com/cz/app/open-arabic/id1594031029'
            )
          }}>
          Download on the App Store
        </Button>
      </Fragment>
    )
  } else {
    return null
  }
}
