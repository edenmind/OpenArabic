import { Button, Divider, List, Text } from 'react-native-paper'
import { Linking, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useSharedStyles } from '../styles/common.js'

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

   const sharedStyle = useSharedStyles()

  // contact links
  const email = 'mailto:salam@edenmind.com?subject=Question&body=Enter your question...'
  const twitter = 'https://twitter.com/OpenArabicIo'
  const instagram = 'https://www.instagram.com/OpenArabic.io'
  const twitterYunus = 'https://twitter.com/YunusAndreasson'
  const githubYunus = 'https://github.com/YunusAndreasson'
  const webYunus = 'https://andreassonphoto.com'

  // github links
  const githubIssues = 'https://github.com/edenmind/OpenArabic/issues'

  return (
    <ScrollView style={style.scrollView}>
      <Image source={require('../assets/1500x500.jpeg')} style={{ width: '100%', height: 150 }} />
      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.arabic}>
        ﷽
      </Text>
      <Text variant="titleLarge" style={style.english}>
        Contact Us
      </Text>
      <Button style={sharedStyle.button} mode="elevated" testID="email" onPress={() => Linking.openURL(email)}>
        Email
      </Button>
      <Button style={sharedStyle.button} mode="elevated" testID="twitter" onPress={() => Linking.openURL(twitter)}>
        Twitter
      </Button>
      <Button style={sharedStyle.button} mode="elevated" testID="instagram" onPress={() => Linking.openURL(instagram)}>
        Instagram
      </Button>
      <Divider style={style.divider} />
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
      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.english}>
        Open Source
      </Text>
      <Text variant="bodyLarge" style={style.english}>
        The platform that OpenArabic runs upon is built using Open Source tools such as React Native, ReactJS, Fastify,
        and Kubernetes. If you are interested in helping with the development, then please check out the OpenArabic
        project on GitHub.
      </Text>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(githubIssues)}>
        Issues on GitHub
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
      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.english}>
        Sources
      </Text>
      <List.Item title="Quran.com - Quranic ayahs." />
      <List.Item title="Sunnah.com - Ḥadīth." />
      <List.Item title="Islamqa.com - Fiqh and aqīdah" />
      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.english}>
        Founder
      </Text>
      <Text variant="bodyLarge" style={style.english}>
        OpenArabic was founded by Yūnus Andréasson in 1442 AH or 2020 AD. Yūnus is a convert to Islam since ~20 years
        ago residing in Sweden working as a Software Developer.
      </Text>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(twitterYunus)}>
        Twitter.com/YunusAndreasson
      </Button>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(githubYunus)}>
        GitHub.com/YunusAndreasson
      </Button>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(webYunus)}>
        AndreassonPhoto.com
      </Button>
      <Text variant="titleLarge" style={style.english}></Text>
    </ScrollView>
  )
}

export default About
