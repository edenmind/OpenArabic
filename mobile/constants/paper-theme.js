import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper'
import merge from 'deepmerge'

const paperDarkTheme = {
  ...MD3DarkTheme,
  version: 3,
  dark: true,
  colors: {
    primary: 'rgb(204, 204, 82)',
    onPrimary: 'rgb(50, 50, 0)',
    primaryContainer: 'rgb(73, 73, 0)',
    onPrimaryContainer: 'rgb(233, 232, 107)',
    secondary: 'rgb(202, 200, 165)',
    onSecondary: 'rgb(50, 50, 24)',
    secondaryContainer: 'rgb(73, 72, 45)',
    onSecondaryContainer: 'rgb(231, 228, 191)',
    tertiary: 'rgb(164, 208, 189)',
    onTertiary: 'rgb(11, 55, 42)',
    tertiaryContainer: 'rgb(37, 78, 64)',
    onTertiaryContainer: 'rgb(191, 236, 216)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(28, 28, 23)',
    onBackground: 'rgb(230, 226, 217)',
    surface: 'rgb(28, 28, 23)',
    onSurface: 'rgb(230, 226, 217)',
    surfaceVariant: 'rgb(72, 71, 58)',
    onSurfaceVariant: 'rgb(202, 199, 182)',
    outline: 'rgb(147, 145, 130)',
    outlineVariant: 'rgb(72, 71, 58)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(230, 226, 217)',
    inverseOnSurface: 'rgb(49, 49, 43)',
    inversePrimary: 'rgb(98, 98, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(37, 37, 26)',
      level2: 'rgb(42, 42, 28)',
      level3: 'rgb(47, 47, 30)',
      level4: 'rgb(49, 49, 30)',
      level5: 'rgb(53, 53, 31)'
    },
    surfaceDisabled: 'rgba(230, 226, 217, 0.12)',
    onSurfaceDisabled: 'rgba(230, 226, 217, 0.38)',
    backdrop: 'rgba(49, 49, 37, 0.4)'
  }
}

const navigationDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,

    primary: 'rgb(204, 204, 82)',
    background: 'rgb(37, 37, 26)',
    card: 'rgb(37, 37, 26)',
    text: 'rgb(230, 226, 217)',
    border: 'rgb(72, 71, 58)'
  }
}

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  light: NavigationDefaultTheme,
  dark: NavigationDarkTheme
})

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme)
export const CombinedDarkTheme = merge(paperDarkTheme, navigationDarkTheme)
