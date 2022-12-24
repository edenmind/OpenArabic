import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const arabicSelector = (state) => state.arabicFontSize
const englishSelector = (state) => state.englishFontSize
const arabicFontNameSelector = (state) => state.arabicFontName

export const useSharedStyles = () => {
  const { arabicFontSize } = useSelector(arabicSelector)
  const { englishFontSize } = useSelector(englishSelector)
  const { arabicFontName } = useSelector(arabicFontNameSelector)

  const opacity = 0.9
  const paddingBottom = 10
  const horizontalMargin = 33
  const verticalMargin = 33

  const styles = useMemo(() => {
    return StyleSheet.create({
      arabicBody: {
        direction: 'rtl',
        fontFamily: arabicFontName,
        fontSize: arabicFontSize,
        lineHeight: arabicFontSize * 2.5,
        opacity,
        paddingBottom,
        textAlign: 'left',
        writingDirection: 'rtl'
      },
      arabicFooter: {
        fontFamily: arabicFontName,
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
        marginBottom: 10,
        marginLeft: horizontalMargin,
        marginRight: horizontalMargin,
        marginTop: 10
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
      englishBody: {
        direction: 'ltr',
        fontFamily: 'philosopher',
        fontSize: englishFontSize,
        lineHeight: englishFontSize * 1.5,
        opacity,
        paddingBottom,
        writingDirection: 'ltr'
      }
    })
  }, [arabicFontSize, englishFontSize, arabicFontName])

  return styles
}
