import { useFocusEffect, useScrollToTop } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React, { useState, useCallback, useRef, useMemo } from 'react'
import { FlatList } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import TextListCard from './text-list-card.js'
import FadeInView from '../components/fade-in-view.js'
import Footer from '../components/footer.js'
import Spinner from '../components/spinner.js'
import TextCategoryIntro from '../components/text-category-intro.js'
import * as api from '../services/api-service.js'
import { getHijriDate, getHijriDateLatin } from '../services/utility-service.js'
import { useSharedStyles } from '../styles/common.js'

const ALL_CATEGORIES = 'All'
const selector = (state) => state.texts
const categoriesSelector = (state) => state.categories
const textsLoadSelector = (state) => state.textsLoading

export default function TextList({ route, navigation }) {
  const theme = useTheme()
  const { category } = route.params
  const [shouldReload, setShouldReload] = useState(true)
  const { texts } = useSelector(selector)
  const { categories } = useSelector(categoriesSelector)
  const { textsLoading } = useSelector(textsLoadSelector)
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

  const renderItem = useCallback(
    ({ item }) => <TextListCard text={item} navigation={navigation} setShouldReload={setShouldReload} />,
    [navigation]
  )

  const categoryDescriptions = categories.filter((cat) => cat.name === category).map((cat) => cat.description)
  const categoryDescription = categoryDescriptions.length > 0 ? categoryDescriptions[0] : ''

  const HeaderComponent = useMemo(() => {
    if (categoryDescription && categoryDescription.length > 0) {
      return <TextCategoryIntro text={categoryDescription} />
    }
    return (
      <>
        <Text style={sharedStyle.arabicDateArabic}>{getHijriDate()}</Text>
        <Text style={sharedStyle.arabicDateLatin}>{getHijriDateLatin()}</Text>
      </>
    )
  }, [categoryDescription, sharedStyle])

  return textsLoading ? (
    <FadeInView style={{ flex: 1 }}>
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
