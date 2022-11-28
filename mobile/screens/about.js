import { Button, Divider, List, Text } from 'react-native-paper'
import { Linking, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'

function About() {
  const style = StyleSheet.create({
    button: { margin: 10 },
    english: {
      direction: 'ltr',
      padding: 10,
      fontFamily: 'philosopher'
    },
    arabic: {
      textAlign: 'center',
      padding: 10,
      direction: 'rtl',
      fontFamily: 'philosopher'
    },
    scrollView: {
      padding: 10,
      paddingBottom: 150
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
    <ScrollView style={style.scrollView}>
      <Image source={require('../assets/1500x500.jpeg')} style={{ width: '100%', height: 150 }} />
      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.arabic}>
        ﷽
      </Text>
      <Text variant="titleLarge" style={style.english}>
        Audience
      </Text>
      <Text variant="bodyLarge" style={style.english}>
        If you know some Arabic and strive to switch from reading Islamic texts in English to reading in Arabic; then
        OpenArabic is a reading platform — featuring short bilingual texts and vocabulary quizzes — that will help you
        in that process, inshāʾAllāh.
      </Text>
      <Text variant="bodyLarge" style={style.english}>
        OpenArabic does not teach the Arabic alphabet nor Arabic grammar.
      </Text>
      <Text variant="bodyLarge" style={style.english}>
        If you need a resource to get you started, then the Duolingo app available on iPhone and Android might come in
        handy.
      </Text>

      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.english}>
        Contact Us
      </Text>
      <Text variant="bodyLarge" style={style.english}>
        Please use any of the following channels to report bugs or request new features.
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
      <Text variant="bodyLarge" style={style.english}>
        The platform that OpenArabic runs upon is built using Open Source tools such as React Native, ReactJS, Fastify,
        and Kubernetes. If you are interested in helping with the development, then please check out the OpenArabic
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
        Islamic Foundation
      </Text>
      <Text variant="bodyLarge" style={style.english}>
        The theological foundation of OpenArabic is based upon the Qurʼān, the Prophetic Sunnah, and the first
        generations of Muslims' understanding with texts from Islamic Scholars such as:
      </Text>
      <List.Item title="al-Hasan al-Basri, d. 110 AH" />
      <List.Item title="Imām Abū Ḥanīfa, d. 150 AH" />
      <List.Item title="Imām Mālik bin Anas, d. 179 AH" />
      <List.Item title="Imām al-Shāfiʿī, d. 204 AH" />
      <List.Item title="Imām Aḥmad ibn Ḥanbal, d. 241 AH" />
      <List.Item title="Imām Nawawī, d. 676 AH" />
      <List.Item title="Ibn Taymiyyah, d. 728 AH" />
      <List.Item title="Shams ad-Dīn adh-Dhahabī, d. 748 AH" />
      <List.Item title="Ibn Qayyim al-Jawziyya, d. 751 AH" />
      <List.Item title="Ibn Kathīr, d. 774 AH" />
      <List.Item title="Ibn Rājab al-Hanbali, d. 795 AH" />
      <List.Item title="al-Fuḍayl ibn ʻIyāḍ, d. 803 AH" />
      <List.Item title="Ibn Ḥajar al-ʿAsqalānī, d. 852 AH" />
      <Text variant="titleLarge" style={style.english}></Text>
    </ScrollView>
  )
}

export default About
