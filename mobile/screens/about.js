import { Button, Divider, List, Text, useTheme } from 'react-native-paper'
import { Linking, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useSharedStyles } from '../styles/common.js'
import FadeInView from '../components/fade-in-view.js'

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
      padding: 15
    }
  })

  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  // contact links
  const email = 'mailto:salam@edenmind.com?subject=Question&body=Enter your question...'
  const twitter = 'https://twitter.com/OpenArabicIo'
  const instagram = 'https://www.instagram.com/OpenArabic.io'
  const twitterYunus = 'https://twitter.com/YunusAndreasson'
  const githubYunus = 'https://github.com/YunusAndreasson'

  const ijaad = 'https://www.ijaadainstitute.com/'
  const amau = 'https://www.amauacademy.com/pages/arabic-with-amau-program'
  const andalus = 'https://www.andalusinstitute.com/'

  const duoLingoIphone = 'https://apps.apple.com/us/app/duolingo-language-lessons/id570060128'
  const duoLingoAndroid = 'https://play.google.com/store/apps/details?id=com.duolingo&hl=en_US'
  const arabic101 = 'https://www.youtube.com/@Arabic101'

  // github links
  const githubIssues = 'https://github.com/edenmind/OpenArabic/'
  const gitHubFirstIssue =
    'https://github.com/edenmind/OpenArabic/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22'

  return (
    <FadeInView style={{ flex: 1 }}>
      <ScrollView style={style.scrollView}>
        <Image source={require('../assets/1500x500.jpeg')} style={{ width: '100%', height: 150, borderRadius: 10 }} />
        <Divider style={style.divider} />
        <Text variant="titleLarge" style={style.arabic}>
          ﷽
        </Text>
        <Divider style={style.divider} />
        <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
          OpenArabic offers resources to enhance Islamic vocabulary, aiming to improve understanding of the Quran, and
          the Prophet's ﷺ sayings, in sha Allah.
        </Text>
        <Divider style={style.divider} />
        <Text variant="titleLarge" style={style.english}>
          Contact Us
        </Text>
        <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
          We would love to receive your suggestions and feedback to help us improve OpenArabic.
        </Text>
        <Button
          icon={'mail'}
          style={sharedStyle.button}
          mode="elevated"
          testID="email"
          onPress={() => Linking.openURL(email)}
        >
          Email
        </Button>
        <Button
          icon={'twitter'}
          style={sharedStyle.button}
          mode="elevated"
          testID="twitter"
          onPress={() => Linking.openURL(twitter)}
        >
          Twitter
        </Button>
        <Button
          icon={'instagram'}
          style={sharedStyle.button}
          mode="elevated"
          testID="instagram"
          onPress={() => Linking.openURL(instagram)}
        >
          Instagram
        </Button>
        <Divider style={style.divider} />
        <Text variant="titleLarge" style={style.english}>
          Learn The Arabic Alphabet
        </Text>
        <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
          OpenArabic doesn't cover the Arabic alphabet, but we recommend using these apps to learn it, ideally with a
          teacher or native speaker for pronunciation guidance.{' '}
        </Text>
        <Button
          icon={'android'}
          style={sharedStyle.button}
          mode="elevated"
          onPress={() => Linking.openURL(duoLingoAndroid)}
        >
          Dulingo Android
        </Button>
        <Button
          icon={'apple'}
          style={sharedStyle.button}
          mode="elevated"
          onPress={() => Linking.openURL(duoLingoIphone)}
        >
          Dulingo iPhone
        </Button>
        <Divider style={style.divider} />
        <Text variant="titleLarge" style={style.english}>
          Learn Arabic Grammar
        </Text>
        <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
          For a comprehensive Arabic learning experience, numerous online and in-person courses are available, covering
          morphology (sarf) and grammar (nahw).
        </Text>
        <Button icon={'youtube'} style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(arabic101)}>
          Arabic 101 (Free)
        </Button>
        <Button icon={'web'} style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(andalus)}>
          Andalus Institute
        </Button>
        <Button icon={'web'} style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(amau)}>
          Arabic With AMAU
        </Button>
        <Button icon={'web'} style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(ijaad)}>
          Ijaada Institute
        </Button>
        <Divider style={style.divider} />
        <Text variant="titleLarge" style={style.english}>
          Open Source Platform
        </Text>
        <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
          OpenArabic is developing a platform optimized for Arabic learning and teaching, using open-source tools like
          Node.js® and Kubernetes since traditional social media platforms aren't ideal for this purpose.
        </Text>
        <Button
          icon={'github'}
          style={sharedStyle.button}
          mode="elevated"
          onPress={() => Linking.openURL(githubIssues)}
        >
          OpenArabic on GitHub
        </Button>
        <Button
          icon={'github'}
          style={sharedStyle.button}
          mode="elevated"
          onPress={() => Linking.openURL(gitHubFirstIssue)}
        >
          Good First Issues
        </Button>
        <Divider style={style.divider} />
        <Text variant="titleLarge" style={style.english}>
          Islamic Foundation
        </Text>
        <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
          The theological basis of OpenArabic is built upon the Qurʼān, the Prophetic ﷺ Sunnah, and the interpretations
          of the first generations of Muslims, as well as texts from Islamic Scholars such as:
        </Text>
        <List.Subheader>Tabi'un</List.Subheader>
        <List.Item title="al-Hasan al-Basri, d. 110 AH" />
        <List.Subheader>The Four Imams</List.Subheader>
        <List.Item title="Imām Abū Ḥanīfa, d. 150 AH" />
        <List.Item title="Imām Mālik bin Anas, d. 179 AH" />
        <List.Item title="Imām al-Shāfiʿī, d. 204 AH" />
        <List.Item title="Imām Aḥmad ibn Ḥanbal, d. 241 AH" />
        <List.Subheader>Later Scholars</List.Subheader>
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
        <Text variant="bodyLarge" style={{ ...sharedStyle.englishBody }}>
          English translations rely on prior translations from trusted sources. Word-for-word translations also utilize
          AI technology to ensure greater alignment with the original Arabic text.
        </Text>
        <Divider style={style.divider} />
        <List.Item title="Quran.com - Quranic ayahs." />
        <List.Item title="Sunnah.com - Ḥadīth." />
        <List.Item
          title="IslamQA.com - Islamic
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
          Yūnus has been taking foundational Sarf and Nahw lessons from Shaykh Mujāhid ‘Abdul-Ba’eth, who is based in
          Philadelphia, U.S. May Allah protect him.
        </Text>
        <Button
          icon={'twitter'}
          style={sharedStyle.button}
          mode="elevated"
          onPress={() => Linking.openURL(twitterYunus)}
        >
          Twitter.com/YunusAndreasson
        </Button>
        <Button icon={'github'} style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(githubYunus)}>
          GitHub.com/YunusAndreasson
        </Button>
        <Divider style={style.divider} />
      </ScrollView>
    </FadeInView>
  )
}

export default About
