import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { paperDarkTheme } from '../constants/paper-theme.js'

const arabicSelector = (state) => state.arabicFontSize
const englishSelector = (state) => state.englishFontSize
const arabicFontNameSelector = (state) => state.arabicFontName

export const useSharedStyles = () => {
  const { arabicFontSize } = useSelector(arabicSelector) || { arabicFontSize: 19 }
  const { englishFontSize } = useSelector(englishSelector) || { englishFontSize: 17 }
  const { arabicFontName } = useSelector(arabicFontNameSelector) || { arabicFontName: 'uthman' }
  const englishOpacity = 0.9
  const arabicOpacity = 1
  const paddingBottom = 10
  const horizontalMargin = 33
  const verticalMargin = 33
  const textColor = paperDarkTheme.colors.onBackground

  return useMemo(() => {
    const FONT_WEIGHTS = {
      amiri: 1.2,
      uthman: 1.5,
      indopak: 1.75,
      noto: 1.2
    }

    const arabicFontSizeWeighted = () => {
      return arabicFontSize * (FONT_WEIGHTS[arabicFontName] || 1)
    }

    return StyleSheet.create({
      arabicBody: {
        color: textColor,
        fontFamily: arabicFontName,
        fontSize: arabicFontSizeWeighted(),
        lineHeight: arabicFontSize * 2,
        opacity: arabicOpacity,
        paddingBottom,
        textAlign: 'right',
        writingDirection: 'rtl'
      },
      arabicDateArabic: {
        color: paperDarkTheme.colors.tertiary,
        fontFamily: 'amiri',
        fontSize: 21,
        paddingLeft: 75,
        paddingRight: 75,
        paddingTop: 10,
        textAlign: 'center'
      },
      arabicDateLatin: {
        color: paperDarkTheme.colors.tertiary,
        fontFamily: 'philosopher',
        fontSize: 15,
        paddingBottom: 10,
        paddingLeft: 75,
        paddingRight: 75,
        textAlign: 'center'
      },
      arabicFooter: {
        color: paperDarkTheme.colors.secondary,
        fontFamily: 'amiri',
        fontSize: 19,
        paddingBottom: 10,
        paddingLeft: 75,
        paddingRight: 75,
        paddingTop: 20,
        textAlign: 'center',
        writingDirection: 'rtl'
      },
      arabicHeading: {
        color: paperDarkTheme.colors.onBackground,
        fontFamily: arabicFontName,
        fontSize: 35
      },
      button: {
        backgroundColor: paperDarkTheme.colors.onPrimary,
        marginBottom: 10,
        marginTop: 10
      },
      buttonAnswer: {
        backgroundColor: paperDarkTheme.colors.elevation.level1,
        borderBottomColor: paperDarkTheme.colors.elevation.level5,
        borderBottomWidth: 5,
        marginBottom: 5,
        marginTop: 5
      },
      container: {
        marginBottom: verticalMargin,
        marginLeft: horizontalMargin,
        marginRight: horizontalMargin,
        marginTop: verticalMargin
      },
      divider: {
        marginBottom: 5,
        marginTop: 5
      },
      dividerHidden: {
        marginBottom: 5,
        marginTop: 5,
        opacity: 0
      },
      englishBody: {
        color: paperDarkTheme.colors.onSurfaceVariant,
        direction: 'ltr',
        fontFamily: 'philosopher',
        fontSize: englishFontSize,
        lineHeight: englishFontSize * 1.4,
        opacity: englishOpacity,
        paddingBottom,
        writingDirection: 'ltr'
      },
      headerContainer: {
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10
      },
      scrollView: {
        direction: 'rtl',
        marginLeft: horizontalMargin,
        padding: 10,
        writingDirection: 'ltr'
      },
      scrollViewLTR: {
        direction: 'ltr',
        padding: 10,
        writingDirection: 'ltr'
      }
    })
  }, [arabicFontName, arabicFontSize, textColor, englishFontSize])
}
