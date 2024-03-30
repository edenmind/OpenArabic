import { useFocusEffect, useScrollToTop } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React, { useState, useCallback, useRef, useMemo, Fragment } from 'react'
import { FlatList, RefreshControl, ScrollView, View } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import TextListCard from './text-list-card.js'
import { PracticeNotify } from './text-list-practice-notify.js'
import Words from './words.js'
import CategoryIntro from '../components/category-intro.js'
import FadeInView from '../components/fade-in-view.js'
import Footer from '../components/footer.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import Spinner from '../components/spinner.js'
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
  const [isReloadRequired, setIsReloadRequired] = useState(true)
  const [practiceWordCount, setPracticeWordCount] = useState(true)
  const [isTextVisible, setIsTextVisible] = useState(false)
  const { texts } = useSelector(selector)
  const { categories } = useSelector(categoriesSelector)
  const { textsLoading } = useSelector(textsLoadSelector)
  const { words } = useSelector(wordsSelector)
  const dispatch = useDispatch()
  const sharedStyle = useSharedStyles(theme)
  const scrollRef = useRef(null)

  useScrollToTop(scrollRef)

  const firstFiveTextsInTexts = texts.slice(0, 5)

  const onRefresh = useCallback(() => {
    dispatch(api.getTexts(category === ALL_CATEGORIES ? '' : category))
  }, [dispatch, category])

  const fetchData = useCallback(() => {
    if (isReloadRequired) {
      onRefresh()
      setIsReloadRequired(false)
    }
  }, [isReloadRequired, onRefresh])

  const EXCLUDED_CATEGORIES = new Set(['Grammar', 'The Quran'])

  const textsByCategory = useMemo(() => {
    const textsByCategory = []
    if (categories && texts) {
      for (const cat of categories) {
        if (!EXCLUDED_CATEGORIES.has(cat.name)) {
          const categoryTexts = texts.filter((text) => text.category === cat.name)
          textsByCategory.push(categoryTexts, { name: cat.name, texts: categoryTexts.slice(0, 5) })
        }
      }
    }
    return textsByCategory
  }, [categories, texts])

  useFocusEffect(fetchData)

  useFocusEffect(
    React.useCallback(() => {
      setPracticeWordCount(words.length)
    }, [words.length])
  )

  const renderItemHorizontal = useCallback(
    ({ item }) => (
      <View style={{ width: 350 }}>
        <TextListCard compact={false} text={item} navigation={navigation} setShouldReload={setIsReloadRequired} />
      </View>
    ),
    [navigation]
  )

  const renderItemVertical = useCallback(
    ({ item }) => (
      <TextListCard compact={true} text={item} navigation={navigation} setShouldReload={setIsReloadRequired} />
    ),
    [navigation]
  )

  const getDescription = (categories, category) => {
    const foundCategory = categories.find((cat) => cat.name === category)
    return foundCategory ? foundCategory.description : ''
  }

  const categoryDescription = getDescription(categories, category)

  const HeaderComponent = useMemo(() => {
    const hasCategoryDescription = categoryDescription && categoryDescription.length > 0
    const hasPracticeWords = practiceWordCount > 0

    if (hasCategoryDescription) {
      return <CategoryIntro text={categoryDescription} />
    }

    return hasPracticeWords ? getPracticeNotify() : getHijriDate()

    function getPracticeNotify() {
      return (
        <PracticeNotify showButton={true} setVisiblePractice={setIsTextVisible}>
          <Text variant="labelMedium">You have {pluralize(practiceWordCount, 'word')} to review</Text>
        </PracticeNotify>
      )
    }

    function getHijriDate() {
      return <Text style={sharedStyle.arabicDateLatin}>{getHijriDateLatin()}</Text>
    }
  }, [categoryDescription, practiceWordCount, sharedStyle.arabicDateLatin])

  return textsLoading ? (
    <>
      <FadeInView>
        <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
          <FlatList
            initialNumToRender={5}
            windowSize={5}
            data={firstFiveTextsInTexts}
            renderItem={renderItemVertical}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Spinner />}
            ListHeaderComponent={HeaderComponent}
            ref={scrollRef}
          />

          {category === 'All' &&
            textsByCategory.map((category, index) => (
              <Fragment key={index}>
                <Text style={{ ...sharedStyle.englishHeading, paddingLeft: 15 }}>{category.name}</Text>
                <FlatList
                  data={category.texts}
                  renderItem={renderItemHorizontal}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={<Spinner />}
                  horizontal={true}
                />
              </Fragment>
            ))}
          <Footer />
        </ScrollView>
      </FadeInView>

      <ModalScrollView
        visible={isTextVisible}
        content={<Words />}
        hideModal={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          setIsTextVisible(false)
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
