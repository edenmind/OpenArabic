import { Button, Divider, List, Text } from 'react-native-paper'
import { Linking, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useSharedStyles } from '../styles/common.js'

function About() {
  const style = StyleSheet.create({
    arabic: {
      direction: 'rtl',
      fontFamily: 'philosopher',
      padding: 10,
      textAlign: 'center'
    },
    divider: { margin: 10, opacity: 0 },
    english: {
      fontFamily: 'philosopher'
    },
    scrollView: {
      padding: 15,
      paddingBottom: 150
    }
  })

  const sharedStyle = useSharedStyles()

  // contact links
  const email = 'mailto:salam@edenmind.com?subject=Question&body=Enter your question...'
  const twitter = 'https://twitter.com/OpenArabicIo'
  const instagram = 'https://www.instagram.com/OpenArabic.io'
  const twitterYunus = 'https://twitter.com/YunusAndreasson'
  const githubYunus = 'https://github.com/YunusAndreasson'

  const ijaad = 'https://www.ijaadainstitute.com/'
  const amau = 'https://www.amauacademy.com/pages/arabic-with-amau-program'
  const andalus = 'https://www.andalusinstitute.com/'

  // github links
  const githubIssues = 'https://github.com/edenmind/OpenArabic/'
  const gitHubFirstIssue =
    'https://github.com/edenmind/OpenArabic/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22'

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
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        We would love to receive your suggestions and feedback to help us improve the app.
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
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        OpenArabic provides resources to help learners improve their Islamic vocabulary as well as their general
        vocabulary.
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        By studying these terms, you will - in sha Allah - gain a better understanding of the prayer, the Quran, and the
        sayings of the Prophet ﷺ.
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        OpenArabic does not offer a comprehensive grammar course, as its main focus is on increasing vocabulary.
        Therefore, we only cover some basic grammatical concepts that can help you extract the three-letter root word by
        removing any prefixes and suffixes attached to it. However, this will, inshaAllah, enhance your understanding of
        how Arabic words are formed without overwhelming you with advanced grammatical concepts.
      </Text>
      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.english}>
        Arabic Courses
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        If you are looking for more comprehensive resources to learn the Arabic language, there are a variety of online
        and in-person courses available that can teach the alphabet as well as advanced grammar.
      </Text>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(andalus)}>
        Andalus Institute
      </Button>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(amau)}>
        Arabic With AMAU
      </Button>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(ijaad)}>
        Ijaada Institute
      </Button>
      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.english}>
        Translating Arabic
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        Translating from Arabic to English can be a challenging task due to its intricate grammar and syntax, which can
        make it difficult to accurately convey the nuances of the original text. The accuracy of translations can depend
        heavily on the context, so we strive to provide each word with the proper context where it is used in Islamic
        texts, to ensure that readers have a clear understanding of its usage.
      </Text>
      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.english}>
        Open Source Platform
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        Through OpenArabic, we are building a platform that is optimized for learning and teaching Arabic since
        traditional social media platforms are not well-suited for this purpose.
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        OpenArabic is built using open source tools such as React Native, ReactJS, Fastify, and Kubernetes.
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        We are actively seeking developers to join us and help us build this platform. If you are interested in
        assisting with the development of OpenArabic, please take a look at the OpenArabic project on GitHub.
      </Text>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(githubIssues)}>
        OpenArabic on GitHub
      </Button>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(gitHubFirstIssue)}>
        Good First Issues
      </Button>
      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.english}>
        Islamic Foundation
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        The theological basis of OpenArabic is built upon the Qurʼān, the Prophetic ﷺ Sunnah, and the interpretations of
        the first generations of Muslims, as well as texts from Islamic Scholars such as:
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
      <List.Item
        title="Islamqa.com - Islamic
        jurisprudence."
      />
      <Divider style={style.divider} />
      <Text variant="titleLarge" style={style.english}>
        Founder
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        Yūnus Andréasson, a convert to Islam for two decades, founded OpenArabic in 2020 AD (1442 AH).
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        As a software developer based in Sweden, he created OpenArabic to provide a comprehensive online learning
        platform for Arabic language.
      </Text>
      <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
        Yūnus has been receiving Sarf and Nahw lessons from Shaykh Mujahid residing in Philadelphia. May Allah protect
        him.
      </Text>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(twitterYunus)}>
        Twitter.com/YunusAndreasson
      </Button>
      <Button style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(githubYunus)}>
        GitHub.com/YunusAndreasson
      </Button>
      <Divider style={style.divider} />
    </ScrollView>
  )
}

export default About
