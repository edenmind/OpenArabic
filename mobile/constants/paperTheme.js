import { COLORS } from './colors'
import { DefaultTheme } from 'react-native-paper'
export const PAPERTHEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.lightOlive
  }
}
