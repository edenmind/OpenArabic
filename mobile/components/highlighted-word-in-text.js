import { Text } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import { paperDarkTheme } from '../constants/paper-theme.js'

const HighlightedWordInText = ({ word, text }) => {
  const sharedStyle = useSharedStyles()
  const splitText = text.split(' ')
  const newText = []

  for (const [index, w] of splitText.entries()) {
    if (w === word) {
      newText.push(
        <Text
          key={index}
          style={{
            ...sharedStyle.arabicBody,
            backgroundColor: paperDarkTheme.colors.primary,
            color: paperDarkTheme.colors.onPrimary,
            fontSize: 40,
            lineHeight: 75
          }}
        >
          &nbsp;{w}&nbsp;
        </Text>
      )
    } else {
      newText.push(
        <Text style={{ ...sharedStyle.arabicBody, fontSize: 40, lineHeight: 75 }} key={index}>
          {` ${w} `}
        </Text>
      )
    }
  }

  return newText
}

export default HighlightedWordInText
