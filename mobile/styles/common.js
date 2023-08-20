import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const arabicSelector = (state) => state.arabicFontSize
const englishSelector = (state) => state.englishFontSize
const arabicFontNameSelector = (state) => state.arabicFontName

export const useSharedStyles = (theme) => {
  const { arabicFontSize } = useSelector(arabicSelector) || { arabicFontSize: 19 }
  const { englishFontSize } = useSelector(englishSelector) || { englishFontSize: 17 }
  const { arabicFontName } = useSelector(arabicFontNameSelector) || { arabicFontName: 'uthman' }
  const englishOpacity = 1
  const arabicOpacity = 1
  const paddingBottom = 5
  const horizontalMargin = 33
  const verticalMargin = 33
  const textColorArabic = theme.colors.secondary

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
      actionButton: {
        color: theme.colors.primary,
        marginBottom: 5,
        marginTop: 5
      },
      actionText: {
        color: theme.colors.onPrimary,
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 1,
        lineHeight: 30,
        textAlign: 'center'
      },
      answerText: {
        color: theme.colors.primary,
        fontSize: 23,
        fontWeight: '600',
        lineHeight: 40,
        textAlign: 'center'
      },
      arabicBody: {
        color: textColorArabic,
        fontFamily: arabicFontName,
        fontSize: arabicFontSizeWeighted() * 1.1,
        lineHeight: arabicFontSize * 2.9,
        opacity: arabicOpacity,
        paddingBottom,
        textAlign: 'right',
        writingDirection: 'rtl'
      },
      arabicDateArabic: {
        color: theme.colors.tertiary,
        fontFamily: 'amiri',
        fontSize: 21,
        paddingLeft: 75,
        paddingRight: 75,
        paddingTop: 10,
        textAlign: 'center'
      },
      arabicDateLatin: {
        color: theme.colors.tertiary,
        fontFamily: 'philosopher',
        fontSize: 15,
        paddingBottom,
        paddingLeft: 75,
        paddingRight: 75,
        textAlign: 'center'
      },
      arabicFooter: {
        color: textColorArabic,
        fontFamily: 'amiri',
        fontSize: 19,
        paddingBottom,
        paddingLeft: 75,
        paddingRight: 75,
        paddingTop: 20,
        textAlign: 'center',
        writingDirection: 'rtl'
      },
      arabicHeading: {
        color: textColorArabic,
        direction: 'rtl',
        fontFamily: arabicFontName,
        fontSize: arabicFontSizeWeighted() * 1.3,
        lineHeight: arabicFontSize * 2.9,
        opacity: arabicOpacity,
        paddingTop: 10,
        textAlign: 'right'
      },
      arabicHeadingRemove: {
        color: theme.colors.error,
        fontFamily: arabicFontName,
        fontSize: arabicFontSizeWeighted() * 1.1,
        lineHeight: arabicFontSize * 2.9,
        opacity: arabicOpacity,
        paddingBottom
      },
      arabicTerm: {
        backgroundColor: theme.colors.elevation.tertiaryContainer,
        color: theme.colors.onTertiaryContainer,
        direction: 'ltr',
        fontFamily: 'philosopher',
        fontSize: englishFontSize * 1.1,
        lineHeight: englishFontSize * 1.5,
        opacity: englishOpacity,
        paddingBottom: 15,
        writingDirection: 'ltr'
      },
      button: {
        marginBottom: 10,
        marginTop: 10
      },
      buttonAnswer: {
        backgroundColor: theme.colors.elevation.transparent,
        borderBottomWidth: 4,
        borderColor: theme.colors.elevation.level5,
        borderWidth: 2,
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
        color: theme.colors.onSurface,
        direction: 'ltr',
        fontFamily: 'philosopher',
        fontSize: englishFontSize * 1.1,
        lineHeight: englishFontSize * 1.5,
        opacity: englishOpacity,
        paddingBottom,
        writingDirection: 'ltr'
      },
      englishHeading: {
        color: theme.colors.onSurface,
        direction: 'ltr',
        fontSize: englishFontSize * 1.1,
        fontWeight: 'bold',
        lineHeight: englishFontSize * 1.7,
        opacity: englishOpacity,
        paddingTop: 10,
        writingDirection: 'ltr'
      },
      headerContainer: {
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10
      },
      labelText: {
        color: theme.colors.secondary,
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
        textAlign: 'center'
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
  }, [
    theme.colors.primary,
    theme.colors.onPrimary,
    theme.colors.tertiary,
    theme.colors.error,
    theme.colors.elevation.tertiaryContainer,
    theme.colors.elevation.transparent,
    theme.colors.elevation.level5,
    theme.colors.onTertiaryContainer,
    theme.colors.onSurface,
    theme.colors.secondary,
    textColorArabic,
    arabicFontName,
    arabicFontSize,
    englishFontSize
  ])
}
