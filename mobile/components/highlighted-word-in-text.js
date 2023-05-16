import { Text, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'

const HighlightedWordInText = ({ word, text }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const splitText = text.split(' ')
  const newText = []

  for (const [index, w] of splitText.entries()) {
    if (w === word) {
      newText.push(
        <Text
          testID="highlighted"
          key={index}
          style={{
            ...sharedStyle.arabicBody,
            backgroundColor: theme.colors.primary,
            color: theme.colors.onPrimary,
            fontSize: 37,
            lineHeight: 70
          }}
        >
          &nbsp;{w}&nbsp;
        </Text>
      )
    } else {
      newText.push(
        <Text
          style={{
            ...sharedStyle.arabicBody,
            fontSize: 37,
            lineHeight: 70,
            color: theme.colors.onSurfaceVariant
          }}
          key={index}
        >
          {` ${w} `}
        </Text>
      )
    }
  }

  return newText
}

export default HighlightedWordInText
