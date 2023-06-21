import * as api from '../services/api-service.js'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, Image } from 'react-native'
import PropTypes from 'prop-types'
import Spinner from '../components/spinner.js'
import TextListCard from './text-list-card.js'
import { useFocusEffect } from '@react-navigation/native'
import { getHijriDate, getHijriDateLatin } from '../services/utility-service.js'
import { Text, Surface, useTheme } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import FadeInView from '../components/fade-in-view.js'

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

  useFocusEffect(
    React.useCallback(() => {
      if (shouldReload) {
        dispatch(api.getTexts(category === 'All' ? '' : category))
      }
    }, [category, dispatch, shouldReload])
  )

  const renderItem = React.useCallback(
    ({ item }) => <TextListCard text={item} navigation={navigation} setShouldReload={setShouldReload} />,
    [navigation]
  )

  // loop through the categories and if the name matches the category passed in through route.params get the description
  const categoryDescription = React.useMemo(() => {
    return categories.filter((cat) => cat.name === category).map((cat) => cat.description)
  }, [categories, category])

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
        ListHeaderComponent={
          categoryDescription.length > 0 ? (
            <Surface style={{ padding: 15, borderRadius: 10, margin: 10 }} elevation={1}>
              <Text variant="labelLarge">{categoryDescription}</Text>
            </Surface>
          ) : (
            <>
              <Text style={sharedStyle.arabicDateArabic}>{getHijriDate()}</Text>
              <Text style={sharedStyle.arabicDateLatin}>{getHijriDateLatin()}</Text>
            </>
          )
        }
        ListFooterComponent={
          <>
            <Text style={sharedStyle.arabicFooter}>
              سبحانك اللهم وبحمدك، أشهد أن لا إله إلا أنت، أستغفرك وأتوب إليك
            </Text>

            <Image
              source={require('../assets/logo.png')}
              style={{ width: 70, height: 70, alignSelf: 'center', marginBottom: 30, opacity: 0.5 }}
            />
          </>
        }
      />
    </FadeInView>
  ) : (
    <Spinner />
  )
}

TextList.propTypes = {
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any
}
