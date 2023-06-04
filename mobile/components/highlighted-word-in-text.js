import { Text, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'

const HighlightedWordInText = ({ word, text }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const splitText = text.split(' ')
  const newText = []
  let isHighlighted = false

  for (const [index, w] of splitText.entries()) {
    if (w === word && !isHighlighted) {
      newText.push(
        <Text
          testID="highlighted"
          key={index}
          style={{
            ...sharedStyle.arabicBody,
            backgroundColor: theme.colors.primary,
            color: theme.colors.onPrimary,
            fontSize: 35,
            lineHeight: 60
          }}
        >
          &nbsp;{w}&nbsp;
        </Text>
      )
      isHighlighted = true
    } else {
      newText.push(
        <Text
          style={{
            ...sharedStyle.arabicBody,
            fontSize: 35,
            lineHeight: 60,
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
