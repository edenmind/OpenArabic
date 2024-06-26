import React from 'react'
import { Linking, ScrollView, StyleSheet, Image } from 'react-native'
import { Button, Divider, List, Text, useTheme } from 'react-native-paper'

import FadeInView from '../components/fade-in-view.js'
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
  const instagramYunus = 'https://www.instagram.com/andreasson.photo/'
  const githubYunus = 'https://github.com/YunusAndreasson'

  return (
    <FadeInView style={{ flex: 1 }}>
      <ScrollView style={style.scrollView}>
        <Image source={require('../assets/1500x500.jpeg')} style={{ borderRadius: 10, height: 150, width: '100%' }} />
        <Divider style={style.divider} />
        <Text variant="displaySmall" style={style.arabic}>
          ﷽
        </Text>
        <Divider style={style.divider} />

        <Text variant="titleMedium">Contact Us</Text>
        <Text variant="bodyMedium">
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
        <Text variant="titleMedium">Islamic Foundation</Text>
        <Text variant="bodyMedium">
          The theological basis of OpenArabic is built upon the Qurʼān, the Prophetic ﷺ Sunnah, and the interpretations
          of the first generations of Muslims, as well as texts from Islamic Scholars such as:
        </Text>
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
        <Text variant="titleMedium">Sources</Text>
        <Text variant="bodyMedium">
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
        <Text variant="titleMedium">Founder</Text>
        <Text variant="bodyMedium">
          Yūnus Andréasson, a convert to Islam for the past two decades, established OpenArabic in 2020 AD (1442 AH).
          Yūnus has studied fundamental Sarf (morphology) and Nahw (grammar) under the guidance of Shaykh Mujahid
          'Abdul-Baeth, who resides in Philadelphia, US.
        </Text>
        <Button
          icon={'twitter'}
          style={sharedStyle.button}
          mode="elevated"
          onPress={() => Linking.openURL(twitterYunus)}
        >
          Twitter
        </Button>
        <Button icon={'github'} style={sharedStyle.button} mode="elevated" onPress={() => Linking.openURL(githubYunus)}>
          GitHub
        </Button>
        <Button
          icon={'instagram'}
          style={sharedStyle.button}
          mode="elevated"
          onPress={() => Linking.openURL(instagramYunus)}
        >
          Instagram
        </Button>

        <Divider style={style.divider} />
      </ScrollView>
    </FadeInView>
  )
}

export default About
