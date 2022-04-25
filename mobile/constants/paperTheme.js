import COLORS from './colors'
import { DefaultTheme } from 'react-native-paper'

const PAPERTHEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.lightOlive
  }
}

export default PAPERTHEME
