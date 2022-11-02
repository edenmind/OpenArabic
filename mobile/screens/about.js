import { Button, Divider, List, Paragraph, Text, Title } from 'react-native-paper'
import { Linking, ScrollView, StyleSheet } from 'react-native'
import COLORS from '../constants/colors.js'
import React from 'react'
import * as storage from '../services/storage.js'

function About() {
  const style = StyleSheet.create({
    button: { margin: 10 },
    english: {
      backgroundColor: COLORS.shinyOlive,
      direction: 'ltr',
      flex: 1,
      lineHeight: 20,
      padding: 10,
      writingDirection: 'ltr'
    },
    scroll: {
      backgroundColor: COLORS.shinyOlive,
      paddingBottom: 25
    }
  })

  // contact links
  const email = 'mailto:salam@edenmind.com?subject=Question&body=Enter your question...'
  const twitter = 'https://twitter.com/OpenArabicIo'
  const github = 'https://github.com/edenmind/OpenArabic'
  const facebook = 'https://www.facebook.com/OpenArabic.io'
  const instagram = 'https://www.instagram.com/OpenArabic.io'

  // github links
  const githubIssues = 'https://github.com/edenmind/OpenArabic/issues'
  const githubPullRequests = 'https://github.com/edenmind/OpenArabic/pulls'
  const githubDiscussions = 'https://github.com/edenmind/OpenArabic/discussions'

  return (
    <ScrollView style={style.english}>
      <Button style={style.button} mode="contained" onPress={() => storage.storeData('language', 'ar')}>
        <Text>Set</Text>
      </Button>
      <Button
        style={style.button}
        mode="contained"
        onPress={async () => {
          const language = await storage.getData('language')
          console.log(language)
        }}
      >
        <Text>Get</Text>
      </Button>
      <Title style={style.english}>
        <Text>Audience</Text>
      </Title>
      <Paragraph style={style.english}>
        <Text>
          If you know some Arabic and strive to switch from reading Islamic texts in English to read in Arabic; then
          OpenArabic is a reading platform — featuring short bilingual texts and vocabulary quizzes — that will help you
          in that process, inshāʾAllāh.
        </Text>
      </Paragraph>
      <Paragraph style={style.english}>
        <Text>
          OpenArabic does not teach the Arabic alphabet nor Arabic grammar. If you need a resource to get you started,
          then the Duolingo app available on iPhone and Android might come in handy.
        </Text>
      </Paragraph>
      <Title style={style.english}>
        <Text>Foundation</Text>
      </Title>
      <Paragraph style={style.english}>
        <Text>
          The theological foundation of OpenArabic is based upon the Qurʼān, the Prophetic Sunnah and the first
          generations of Muslims understanding with texts from Islamic Scholars such as:
        </Text>
      </Paragraph>
      <List.Item title="al-Hasan al-Basri" />
      <List.Item title="Imām Abū Ḥanīfa" />
      <List.Item title="Imām Mālik bin Anas" />
      <List.Item title="Imām al-Shāfiʿī" />
      <List.Item title="Imām Aḥmad ibn Ḥanbal" />
      <List.Item title="Ibn Rājab al-Hanbali" />
      <List.Item title="Ibn Taymiyyah" />
      <List.Item title="Ibn Qayyim al-Jawziyya" />
      <List.Item title="Shams ad-Dīn adh-Dhahabī" />
      <List.Item title="Imām Nawawī" />
      <List.Item title="Ibn Kathīr" />
      <List.Item title="Ibn Ḥajar al-ʿAsqalānī" />
      <List.Item title="al-Fuḍayl ibn ʻIyāḍ" />
      <Paragraph style={style.english} />
      <Title style={style.english}>
        <Text>Open Source</Text>
      </Title>
      <Paragraph style={style.english}>
        <Text>
          The platform that OpenArabic runs upon is built using Open Source tools such as React Native, ReactJS,
          Fastify, and Kubernetes. If you are interested in helping out with the development, then please check out the
          OpenArabic project on GitHub.
        </Text>
      </Paragraph>
      <Button style={style.button} mode="contained" onPress={() => Linking.openURL(githubIssues)}>
        <Text>Issues</Text>
      </Button>
      <Button style={style.button} mode="contained" onPress={() => Linking.openURL(githubDiscussions)}>
        <Text>Discussions</Text>
      </Button>
      <Button style={style.button} mode="contained" onPress={() => Linking.openURL(githubPullRequests)}>
        <Text>Pull Requests</Text>
      </Button>
      <Paragraph style={style.english} />
      <Title style={style.english}>
        <Text>Contact Us</Text>
      </Title>
      <Paragraph style={style.english}>
        <Text>Please use any of the following channels to report bugs or requests new features.</Text>
      </Paragraph>
      <Button style={style.button} mode="contained" testID="email" onPress={() => Linking.openURL(email)}>
        <Text>Email</Text>
      </Button>
      <Button style={style.button} mode="contained" testID="twitter" onPress={() => Linking.openURL(twitter)}>
        <Text>Twitter</Text>
      </Button>
      <Button style={style.button} mode="contained" testID="github" onPress={() => Linking.openURL(github)}>
        <Text>GitHub</Text>
      </Button>
      <Button style={style.button} mode="contained" testID="instagram" onPress={() => Linking.openURL(instagram)}>
        <Text>Instagram</Text>
      </Button>
      <Button style={style.button} mode="contained" testID="facebook" onPress={() => Linking.openURL(facebook)}>
        <Text>Facebook</Text>
      </Button>
      <Divider style={style.scroll} />
    </ScrollView>
  )
}

export default About
