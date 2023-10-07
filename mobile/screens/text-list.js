import { useFocusEffect, useScrollToTop } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useState, useCallback, useRef, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { useTheme, Text, Surface, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import TextListCard from './text-list-card.js'
import Words from './words.js'
import FadeInView from '../components/fade-in-view.js'
import Footer from '../components/footer.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import Spinner from '../components/spinner.js'
import TextCategoryIntro from '../components/text-category-intro.js'
import * as api from '../services/api-service.js'
import { pluralize } from '../services/ui-services.js'
import { getHijriDateLatin } from '../services/utility-service.js'
import { useSharedStyles } from '../styles/common.js'

const ALL_CATEGORIES = 'All'
const selector = (state) => state.texts
const categoriesSelector = (state) => state.categories
const textsLoadSelector = (state) => state.textsLoading
const wordsSelector = (state) => state.words

export default function TextList({ route, navigation }) {
  const theme = useTheme()
  const { category } = route.params
  const [shouldReload, setShouldReload] = useState(true)
  const [numberOfPracticeWords, setNumberOfPracticeWords] = useState(true)
  const [visiblePractice, setVisiblePractice] = useState(false)
  const { texts } = useSelector(selector)
  const { categories } = useSelector(categoriesSelector)
  const { textsLoading } = useSelector(textsLoadSelector)
  const { words } = useSelector(wordsSelector)
  const dispatch = useDispatch()
  const sharedStyle = useSharedStyles(theme)
  const ref = useRef(null)

  useScrollToTop(ref)

  const onRefresh = useCallback(() => {
    dispatch(api.getTexts(category === ALL_CATEGORIES ? '' : category))
  }, [dispatch, category])

  const fetchData = useCallback(() => {
    if (shouldReload) {
      onRefresh()
      setShouldReload(false)
    }
  }, [shouldReload, onRefresh])

  useFocusEffect(fetchData)

  useFocusEffect(
    React.useCallback(() => {
      setNumberOfPracticeWords(words.length)
    }, [words.length])
  )

  const renderItem = useCallback(
    ({ item }) => <TextListCard text={item} navigation={navigation} setShouldReload={setShouldReload} />,
    [navigation]
  )

  const categoryDescriptions = categories.filter((cat) => cat.name === category).map((cat) => cat.description)
  const categoryDescription = categoryDescriptions.length > 0 ? categoryDescriptions[0] : ''

  const CustomSurface = ({ children, showButton = false }) => (
    <Surface
      elevation={1}
      style={{
        ...sharedStyle.container,
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderBottomWidth: 4,
        borderColor: theme.colors.elevation.level2,
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: 'row',
        marginBottom: 4
      }}
    >
      <View style={{ ...sharedStyle.container, flex: 1 }}>{children}</View>
      {showButton && (
        <Button
          icon={'brain'}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setVisiblePractice(true)
          }}
        >
          Practice
        </Button>
      )}
    </Surface>
  )

  CustomSurface.propTypes = {
    children: PropTypes.node.isRequired,
    showButton: PropTypes.bool
  }

  const HeaderComponent = useMemo(() => {
    if (categoryDescription && categoryDescription.length > 0) {
      return <TextCategoryIntro text={categoryDescription} />
    }

    return numberOfPracticeWords > 0 ? (
      <CustomSurface showButton={true}>
        <Text variant="labelMedium">You have {pluralize(numberOfPracticeWords, 'word')} to review</Text>
      </CustomSurface>
    ) : (
      <Text style={sharedStyle.arabicDateLatin}>{getHijriDateLatin()}</Text>
    )
  }, [categoryDescription, numberOfPracticeWords, sharedStyle.arabicDateLatin])

  return textsLoading ? (
    <>
      <FadeInView>
        <FlatList
          initialNumToRender={5}
          removeClippedSubviews={true}
          windowSize={5}
          data={texts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Spinner />}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={Footer}
          ref={ref}
          onRefresh={onRefresh}
          refreshing={false}
        />
      </FadeInView>
      <ModalScrollView
        visible={visiblePractice}
        content={<Words />}
        hideModal={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          setVisiblePractice(false)
        }}
      />
    </>
  ) : (
    <Spinner />
  )
}

TextList.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}
