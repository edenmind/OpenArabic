import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper'

import merge from 'deepmerge'

export const paperDarkTheme = {
  ...MD3DarkTheme,
  version: 3,
  dark: true,
  colors: {
    primary: 'rgb(156, 215, 105)',
    onPrimary: 'rgb(26, 55, 0)',
    primaryContainer: 'rgb(40, 80, 0)',
    onPrimaryContainer: 'rgb(183, 244, 129)',
    secondary: 'rgb(190, 203, 174)',
    onSecondary: 'rgb(41, 52, 31)',
    secondaryContainer: 'rgb(63, 74, 52)',
    onSecondaryContainer: 'rgb(218, 231, 201)',
    tertiary: 'rgb(160, 207, 205)',
    onTertiary: 'rgb(0, 55, 54)',
    tertiaryContainer: 'rgb(30, 78, 77)',
    onTertiaryContainer: 'rgb(187, 236, 233)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(26, 28, 24)',
    onBackground: 'rgb(227, 227, 220)',
    surface: 'rgb(26, 28, 24)',
    onSurface: 'rgb(227, 227, 220)',
    surfaceVariant: 'rgb(68, 72, 62)',
    onSurfaceVariant: 'rgb(196, 200, 186)',
    outline: 'rgb(142, 146, 134)',
    outlineVariant: 'rgb(68, 72, 62)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(227, 227, 220)',
    inverseOnSurface: 'rgb(47, 49, 44)',
    inversePrimary: 'rgb(56, 107, 1)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(33, 37, 28)',
      level2: 'rgb(36, 43, 31)',
      level3: 'rgb(40, 49, 33)',
      level4: 'rgb(42, 50, 34)',
      level5: 'rgb(44, 54, 35)'
    },
    surfaceDisabled: 'rgba(227, 227, 220, 0.12)',
    onSurfaceDisabled: 'rgba(227, 227, 220, 0.38)',
    backdrop: 'rgba(45, 50, 40, 0.4)'
  }
}

const navigationDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,

    primary: 'rgb(156, 215, 105)',
    background: 'rgb(26, 28, 24)',
    text: 'rgb(227, 227, 220)',
    border: 'rgb(68, 72, 62)'
  }
}

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme
})

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme)
export const CombinedDarkTheme = merge(paperDarkTheme, navigationDarkTheme)
