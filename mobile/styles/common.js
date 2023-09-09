/* eslint-disable unicorn/consistent-destructuring */
import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const FONT_WEIGHTS = {
  amiri: 1.2,
  indopak: 1.75,
  noto: 1.2,
  uthman: 1.5
}

const BASE_MARGIN = 5
const EXTRA_MARGIN = 33
const BASE_PADDING = 10
const EXTRA_PADDING = 75

const getTextStyle = (color, fontSize, fontWeight, lineHeight, textAlign = 'center', letterSpacing = 0) => ({
  color,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign
})

const arabicSelector = (state) => state.arabicFontSize
const englishSelector = (state) => state.englishFontSize
const arabicFontNameSelector = (state) => state.arabicFontName

export const useSharedStyles = (theme) => {
  const { primary, tertiary, error, elevation, outline, onSurface, secondary, onPrimary } = theme.colors

  const { arabicFontSize } = useSelector(arabicSelector) || { arabicFontSize: 19 }
  const { englishFontSize } = useSelector(englishSelector) || { englishFontSize: 17 }
  const { arabicFontName } = useSelector(arabicFontNameSelector) || { arabicFontName: 'uthman' }

  const arabicFontSizeWeighted = arabicFontSize * (FONT_WEIGHTS[arabicFontName] || 1)

  return useMemo(() => {
    return StyleSheet.create({
      actionButton: {
        marginVertical: BASE_MARGIN
      },
      actionText: getTextStyle(onPrimary, 21, '700', 40, 'center', 0.75),
      answerText: getTextStyle(primary, 23, '600', 40),
      arabicBody: {
        ...getTextStyle(secondary, arabicFontSizeWeighted * 1.1, 'normal', arabicFontSize * 2.9, 'right'),
        fontFamily: arabicFontName,
        paddingBottom: BASE_PADDING,
        writingDirection: 'rtl'
      },
      arabicDateArabic: {
        ...getTextStyle(tertiary, 21, 'normal', undefined, 'center'),
        fontFamily: 'amiri',
        paddingHorizontal: EXTRA_PADDING,
        paddingTop: BASE_PADDING
      },
      arabicDateLatin: {
        ...getTextStyle(tertiary, 15, 'normal', undefined, 'center'),
        fontFamily: 'philosopher',
        paddingBottom: BASE_PADDING,
        paddingHorizontal: EXTRA_PADDING
      },
      arabicFooter: {
        ...getTextStyle(secondary, 19, 'normal', undefined, 'center'),
        fontFamily: 'amiri',
        paddingHorizontal: EXTRA_PADDING,
        paddingTop: BASE_PADDING * 2,
        writingDirection: 'rtl'
      },
      arabicHeading: {
        ...getTextStyle(secondary, arabicFontSizeWeighted * 1.3, 'normal', arabicFontSize * 2.9, 'right'),
        fontFamily: arabicFontName,
        paddingVertical: BASE_PADDING,
        writingDirection: 'rtl'
      },
      arabicHeadingRemove: {
        ...getTextStyle(error, arabicFontSizeWeighted * 1.1, 'normal', arabicFontSize * 2.9),
        fontFamily: arabicFontName,
        paddingVertical: BASE_PADDING,
        textAlign: 'right'
      },
      arabicTerm: {
        ...getTextStyle(tertiary, englishFontSize * 1.1, 'normal', englishFontSize * 1.5),
        backgroundColor: elevation.tertiaryContainer,
        direction: 'ltr',
        fontFamily: 'philosopher',
        paddingBottom: BASE_PADDING * 2,
        textAlign: 'left',
        writingDirection: 'ltr'
      },
      author: {
        color: theme.colors.onSurfaceVariant,
        paddingTop: 15,
        textAlign: 'center'
      },
      button: {
        marginBottom: BASE_MARGIN,
        marginTop: BASE_MARGIN
      },
      buttonAnswer: {
        backgroundColor: elevation.transparent,
        borderBottomWidth: 4,
        borderColor: elevation.level5,
        borderWidth: 2,
        marginVertical: BASE_MARGIN
      },
      card: {
        marginHorizontal: BASE_MARGIN,
        marginVertical: 2 * BASE_MARGIN
      },
      cardAction: {
        marginRight: BASE_MARGIN,
        paddingBottom: BASE_PADDING * 2,
        paddingTop: BASE_PADDING * 2.5
      },
      cardSubTitle: {
        color: outline
      },
      cardTitle: {
        fontFamily: 'philosopher',
        paddingVertical: BASE_PADDING
      },
      container: {
        margin: BASE_MARGIN * 3
      },
      divider: {
        marginBottom: BASE_MARGIN,
        marginTop: BASE_MARGIN
      },
      dividerHidden: {
        marginBottom: BASE_MARGIN,
        marginTop: BASE_MARGIN,
        opacity: 0
      },
      englishBody: {
        ...getTextStyle(onSurface, englishFontSize * 1.1, 'normal', englishFontSize * 1.5),
        direction: 'ltr',
        fontFamily: 'philosopher',
        paddingBottom: BASE_PADDING,
        textAlign: 'left',
        writingDirection: 'ltr'
      },
      englishHeading: {
        ...getTextStyle(onSurface, englishFontSize * 1.1, 'bold', englishFontSize * 1.7),
        direction: 'ltr',
        paddingTop: BASE_PADDING,
        textAlign: 'left',
        writingDirection: 'ltr'
      },
      headerContainer: {
        marginLeft: BASE_MARGIN,
        marginRight: BASE_MARGIN,
        paddingTop: BASE_PADDING
      },
      image: {
        height: 200
      },
      labelText: {
        ...getTextStyle(secondary, 10, '700'),
        letterSpacing: 0.5
      },
      logoStyle: {
        alignSelf: 'center',
        height: 70,
        marginBottom: 30,
        opacity: 0.5,
        width: 70
      },
      practiceContainer: {
        backgroundColor: theme.colors.elevation.level0,
        minHeight: 250
      },
      reading: {
        color: theme.colors.outline,
        paddingBottom: 10,
        paddingTop: 20,
        textAlign: 'center'
      },
      scrollView: {
        direction: 'rtl',
        marginLeft: EXTRA_MARGIN,
        padding: BASE_PADDING,
        writingDirection: 'ltr'
      },

      scrollViewLTR: {
        direction: 'ltr',
        padding: BASE_PADDING,
        writingDirection: 'ltr'
      },
      title: {
        color: theme.colors.onBackground,
        fontFamily: 'philosopher',
        paddingHorizontal: 25,
        paddingTop: 25,
        textAlign: 'center'
      },
      wordCenteredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
      },
      wordContainer: {
        flex: 1,
        margin: 10
      },
      wordSurface: {
        alignItems: 'center',
        backgroundColor: theme.colors.elevation.level0,
        flex: 1,
        minHeight: 320
      },
      wordText: {
        fontFamily: 'uthman',
        paddingBottom: 60,
        textAlign: 'center',
        width: '97%'
      }
    })
  }, [
    onPrimary,
    primary,
    secondary,
    arabicFontSizeWeighted,
    arabicFontSize,
    arabicFontName,
    tertiary,
    error,
    englishFontSize,
    elevation.tertiaryContainer,
    elevation.transparent,
    elevation.level5,
    theme.colors.onSurfaceVariant,
    theme.colors.elevation.level0,
    theme.colors.outline,
    theme.colors.onBackground,
    outline,
    onSurface
  ])
}
