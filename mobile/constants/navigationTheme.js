import { COLORS } from './colors'
import { DefaultTheme } from 'react-native-paper'
import { DefaultTheme as NavigationContainerDefaultTheme } from '@react-navigation/native'

export const NAVIGATIONTHEME = {
  ...NavigationContainerDefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.darkOlive,
    border: COLORS.leaf,
    text: COLORS.darkOlive,
    notification: COLORS.leaf,
    background: COLORS.shinyOlive,
    card: COLORS.shinyOlive
  }
}
