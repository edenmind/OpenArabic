import { Button, Divider, List, Text } from 'react-native-paper'
import { Linking, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'

function About() {
  const style = StyleSheet.create({
    button: { margin: 10 },
    english: {
      direction: 'ltr',
      flex: 1,
      lineHeight: 20,
      padding: 10,
      writingDirection: 'ltr'
    },
    divider: { margin: 10 }
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
      <Image source={require('../assets/1500x500.jpeg')} style={{ width: '100%', height: 150 }} />

      <Divider style={style.divider} />

      <Text variant="titleLarge" style={style.english}>
        Audience
      </Text>

      <Text variant="bodyMedium" style={style.english}>
        If you know some Arabic and strive to switch from reading Islamic texts in English to read in Arabic; then
        OpenArabic is a reading platform — featuring short bilingual texts and vocabulary quizzes — that will help you
        in that process, inshāʾAllāh.
      </Text>
      <Text variant="bodyMedium" style={style.english}>
        OpenArabic does not teach the Arabic alphabet nor Arabic grammar. If you need a resource to get you started,
        then the Duolingo app available on iPhone and Android might come in handy.
      </Text>

      <Divider style={style.divider} />

      <Text variant="titleLarge" style={style.english}>
        Contact Us
      </Text>

      <Text variant="bodyMedium" style={style.english}>
        Please use any of the following channels to report bugs or requests new features.
      </Text>
      <Button style={style.button} mode="outlined" testID="email" onPress={() => Linking.openURL(email)}>
        Email
      </Button>
      <Button style={style.button} mode="outlined" testID="twitter" onPress={() => Linking.openURL(twitter)}>
        Twitter
      </Button>
      <Button style={style.button} mode="outlined" testID="github" onPress={() => Linking.openURL(github)}>
        GitHub
      </Button>
      <Button style={style.button} mode="outlined" testID="instagram" onPress={() => Linking.openURL(instagram)}>
        Instagram
      </Button>
      <Button style={style.button} mode="outlined" testID="facebook" onPress={() => Linking.openURL(facebook)}>
        Facebook
      </Button>

      <Divider style={style.divider} />

      <Text variant="titleLarge" style={style.english}>
        Open Source
      </Text>

      <Text variant="bodyMedium" style={style.english}>
        The platform that OpenArabic runs upon is built using Open Source tools such as React Native, ReactJS, Fastify,
        and Kubernetes. If you are interested in helping out with the development, then please check out the OpenArabic
        project on GitHub.
      </Text>
      <Button style={style.button} mode="outlined" onPress={() => Linking.openURL(githubIssues)}>
        Issues
      </Button>
      <Button style={style.button} mode="outlined" onPress={() => Linking.openURL(githubDiscussions)}>
        Discussions
      </Button>
      <Button style={style.button} mode="outlined" onPress={() => Linking.openURL(githubPullRequests)}>
        Pull Requests
      </Button>

      <Divider style={style.divider} />

      <Text variant="titleLarge" style={style.english}>
        Foundation
      </Text>

      <Text variant="bodyMedium" style={style.english}>
        The theological foundation of OpenArabic is based upon the Qurʼān, the Prophetic Sunnah and the first
        generations of Muslims understanding with texts from Islamic Scholars such as:
      </Text>
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
    </ScrollView>
  )
}

export default About
