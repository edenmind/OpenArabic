import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { paperDarkTheme } from '../constants/paper-theme.js'

const arabicSelector = (state) => state.arabicFontSize
const englishSelector = (state) => state.englishFontSize
const arabicFontNameSelector = (state) => state.arabicFontName

export const useSharedStyles = () => {
  const { arabicFontSize } = useSelector(arabicSelector)
  const { englishFontSize } = useSelector(englishSelector)
  const { arabicFontName } = useSelector(arabicFontNameSelector)

  const englishOpacity = 0.8
  const arabicOpacity = 1
  const paddingBottom = 10
  const horizontalMargin = 33
  const verticalMargin = 33

  const styles = useMemo(() => {
    const arabicFontSizeWeighted = () => {
      if (arabicFontName == 'amiri') {
        return arabicFontSize * 1.2
      }

      if (arabicFontName == 'uthman') {
        return arabicFontSize * 1.5
      }

      if (arabicFontName == 'indopak') {
        return arabicFontSize * 1.75
      }

      if (arabicFontName == 'indopak') {
        return arabicFontSize * 1.5
      }

      if (arabicFontName == 'noto') {
        return arabicFontSize * 1.2
      }
    }

    return StyleSheet.create({
      arabicBody: {
        fontFamily: arabicFontName,
        fontSize: arabicFontSizeWeighted(),
        lineHeight: arabicFontSize * 3.5,
        opacity: arabicOpacity,
        paddingBottom,
        textAlign: 'right',
        writingDirection: 'rtl'
      },
      arabicFooter: {
        fontFamily: 'amiri',
        fontSize: 17,
        opacity: 0.7,
        paddingBottom: 10,
        paddingLeft: 75,
        paddingRight: 75,
        paddingTop: 20,
        readingDirection: 'rtl',
        textAlign: 'center',
        writingDirection: 'rtl'
      },
      button: {
        backgroundColor: paperDarkTheme.colors.onPrimary,
        marginBottom: 10,
        marginTop: 10
      },
      buttonAnswer: {
        backgroundColor: paperDarkTheme.colors.onPrimary,
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
        direction: 'ltr',
        fontFamily: 'philosopher',
        fontSize: englishFontSize,
        lineHeight: englishFontSize * 1.5,
        opacity: englishOpacity,
        paddingBottom,
        writingDirection: 'ltr'
      },
      headerContainer: {
        marginLeft: 15,
        marginRight: 15,
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
  }, [arabicFontSize, englishFontSize, arabicFontName])

  return styles
}
