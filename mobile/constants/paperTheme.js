import { COLORS } from './colors'
import { DefaultTheme } from 'react-native-paper'
export const PAPERTHEME = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.darkOlive,
    accent: COLORS.leaf
  }
}
