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
  const { primary, tertiary, error, elevation, onSurface, secondary, onPrimary } = theme.colors

  const { arabicFontSize } = useSelector(arabicSelector) || { arabicFontSize: 19 }
  const { englishFontSize } = useSelector(englishSelector) || { englishFontSize: 17 }
  const { arabicFontName } = useSelector(arabicFontNameSelector) || { arabicFontName: 'uthman' }

  // Branded components
  const BACKGROUND_COLOR = theme.colors.transparent
  const BORDER_BOTTOM_WIDTH = 4
  const BORDER_WIDTH = 2
  const BORDER_COLOR = theme.colors.elevation.level2

  const arabicFontSizeWeighted = arabicFontSize * (FONT_WEIGHTS[arabicFontName] || 1)

  return useMemo(() => {
    return StyleSheet.create({
      actionButton: {
        marginVertical: BASE_MARGIN
      },
      // color, fontSize, fontWeight, lineHeight, textAlign = 'center', letterSpacing = 0
      actionText: getTextStyle(onPrimary, 18, '800', 40, 'center', 2.5),
      actionTextPrimary: getTextStyle(primary, 18, '800', 40, 'center', 2.5),
      actionTextPrimarySmall: getTextStyle(onPrimary, 17, '800', 25, 'center', 2.5),
      answerText: getTextStyle(primary, 23, '600', 40),
      answerTextSmall: getTextStyle(primary, 17, '800', 25, 'center', 2.5),
      arabic: {
        color: theme.colors.onSurface,
        direction: 'rtl',
        fontFamily: 'philosopher',
        fontSize: 45,
        paddingBottom: 50,
        paddingTop: 50,
        textAlign: 'center'
      },
      arabicBody: {
        ...getTextStyle(onSurface, arabicFontSizeWeighted * 1.1, 'normal', arabicFontSize * 2.9, 'right'),
        direction: 'rtl',
        fontFamily: arabicFontName,
        paddingBottom: BASE_PADDING,
        writingDirection: 'rtl'
      },
      arabicDateArabic: {
        ...getTextStyle(tertiary, 19, 'normal', undefined, 'center'),
        fontFamily: 'amiri',
        paddingHorizontal: EXTRA_PADDING,
        paddingTop: BASE_PADDING
      },
      arabicDateLatin: {
        ...getTextStyle(onSurface, 17, 'normal', undefined, 'center'),
        fontFamily: 'philosopher',
        paddingTop: BASE_PADDING
      },
      arabicFooter: {
        ...getTextStyle(secondary, 19, 'normal', undefined, 'center'),
        fontFamily: 'amiri',
        paddingHorizontal: EXTRA_PADDING,
        paddingTop: BASE_PADDING * 2,
        writingDirection: 'rtl'
      },
      arabicHeading: {
        ...getTextStyle(secondary, arabicFontSizeWeighted * 1.3, 'normal', arabicFontSize * 2.9),
        fontFamily: arabicFontName,
        marginHorizontal: BASE_MARGIN,
        paddingVertical: BASE_PADDING,
        textAlign: 'left'
      },
      arabicHeadingRemove: {
        ...getTextStyle(error, arabicFontSizeWeighted * 1.1, 'normal', arabicFontSize * 2.9),
        fontFamily: arabicFontName,
        marginHorizontal: BASE_MARGIN,
        paddingVertical: BASE_PADDING,
        textAlign: 'left'
      },
      arabicTerm: {
        ...getTextStyle(tertiary, englishFontSize * 1.1, 'normal', englishFontSize * 1.5),
        backgroundColor: elevation.tertiaryContainer,
        direction: 'ltr',
        fontFamily: 'philosopher',
        marginHorizontal: BASE_MARGIN,
        paddingBottom: BASE_PADDING * 2,
        textAlign: 'left',
        writingDirection: 'ltr'
      },
      author: {
        color: theme.colors.onSurfaceVariant,
        paddingTop: 15,
        textAlign: 'center'
      },
      bottomView: {
        bottom: 20,
        position: 'absolute',
        width: '100%'
      },
      button: {
        marginBottom: BASE_MARGIN,
        marginTop: BASE_MARGIN
      },
      buttonAnswer: {
        backgroundColor: BACKGROUND_COLOR,
        borderBottomWidth: BORDER_BOTTOM_WIDTH,
        borderColor: BORDER_COLOR,
        borderWidth: BORDER_WIDTH,
        marginVertical: BASE_MARGIN
      },
      card: {
        backgroundColor: BACKGROUND_COLOR,
        borderBottomWidth: BORDER_BOTTOM_WIDTH,
        borderColor: BORDER_COLOR,
        borderWidth: BORDER_WIDTH,
        marginHorizontal: 3 * BASE_MARGIN,
        marginVertical: 1.5 * BASE_MARGIN
      },
      cardAction: {
        marginRight: BASE_MARGIN,
        paddingBottom: BASE_PADDING
      },
      cardTitle: {
        fontFamily: 'philosopher',
        fontSize: 21
      },
      chip: {
        backgroundColor: BACKGROUND_COLOR,
        borderBottomWidth: BORDER_BOTTOM_WIDTH,
        borderColor: BORDER_COLOR,
        borderWidth: BORDER_WIDTH
      },
      container: {
        margin: BASE_MARGIN * 3
      },
      dhikrText: {
        color: theme.colors.secondary,
        fontFamily: 'philosopher',
        fontSize: 18,
        marginTop: 33,
        textAlign: 'center'
      },
      divider: {
        marginBottom: BASE_MARGIN,
        marginTop: BASE_MARGIN
      },
      dividerHidden: {
        marginBottom: BASE_MARGIN * 2,
        marginTop: BASE_MARGIN * 2,
        opacity: 0
      },
      englishBody: {
        ...getTextStyle(onSurface, englishFontSize * 1.1, 'normal', englishFontSize * 1.7),
        direction: 'ltr',
        fontFamily: 'philosopher',
        margin: BASE_MARGIN,
        paddingBottom: BASE_PADDING,
        textAlign: 'left',
        writingDirection: 'ltr'
      },
      englishHeading: {
        ...getTextStyle(onSurface, englishFontSize * 1.1, 'bold', englishFontSize * 1.7),
        direction: 'ltr',
        marginHorizontal: BASE_MARGIN,
        paddingTop: BASE_PADDING,
        textAlign: 'left',
        writingDirection: 'ltr'
      },
      grammarText: {
        color: theme.colors.onSurface,
        direction: 'ltr',
        marginHorizontal: 5,
        marginVertical: 0,
        paddingBottom: 0
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
        color: theme.colors.tertiary,
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
      progressBar: {
        backgroundColor: theme.colors.elevation.level5,
        borderRadius: 10,
        height: 15,
        marginVertical: 10,
        width: '100%'
      },
      reading: {
        color: theme.colors.outline,
        paddingBottom: 10,
        paddingTop: 20,
        textAlign: 'center'
      },
      scrollView: {
        direction: 'rtl',
        marginLeft: BASE_MARGIN,
        padding: BASE_PADDING
      },
      scrollViewLTR: {
        direction: 'ltr',
        padding: BASE_PADDING,
        writingDirection: 'ltr'
      },
      spinnerContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 33
      },
      title: {
        color: theme.colors.onBackground,
        fontFamily: 'philosopher',
        paddingHorizontal: 25,
        textAlign: 'center'
      },
      wordCenteredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
      },
      wordContainer: {
        flex: 1,
        marginVertical: 10
      },
      wordSurface: {
        alignItems: 'center',
        backgroundColor: theme.colors.elevation.level0,
        flex: 1,
        height: '100%',
        verticalAlign: 'middle',
        width: '100%'
      },
      wordText: {
        fontFamily: 'uthman'
      }
    })
  }, [
    onPrimary,
    primary,
    theme.colors.onSurface,
    theme.colors.onSurfaceVariant,
    theme.colors.secondary,
    theme.colors.tertiary,
    theme.colors.elevation.level0,
    theme.colors.elevation.level5,
    theme.colors.outline,
    theme.colors.onBackground,
    secondary,
    arabicFontSizeWeighted,
    arabicFontSize,
    arabicFontName,
    tertiary,
    onSurface,
    error,
    englishFontSize,
    elevation.tertiaryContainer,
    BACKGROUND_COLOR,
    BORDER_COLOR
  ])
}
