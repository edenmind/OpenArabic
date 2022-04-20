import { COLORS } from './colors'
import { DefaultTheme } from 'react-native-paper'
export const PAPERTHEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.darkOlive,
    accent: COLORS.leaf
  }
}
