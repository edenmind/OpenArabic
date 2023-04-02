import 'react-native-gesture-handler'
import { Share } from 'react-native'
import { ENDPOINT, HOST } from '../constants/urls.js'
import * as MailComposer from 'expo-mail-composer'

export function generateShare(text) {
  async function shareText() {
    await Share.share({
      message: `🔗 ${text.title} - ${text.author}`,
      title: `🔗 ${text.title} - ${text.author}`,
      url: `${HOST.frontend}/${ENDPOINT.texts}/${text.slug}`
    })
  }

  return shareText
}

export function generateError(text) {
  async function composeError() {
    await MailComposer.composeAsync({
      recipients: ['salam@edenmin.com'],
      subject: `Found an error in the text: ${text.title}`,
      body: `Please describe the error you found in the text: ${text.id}...`
    })
  }

  return composeError
}
