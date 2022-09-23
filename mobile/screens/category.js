/* eslint-disable import/namespace */
import * as api from '../services/api-service.js'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import Spinner from '../components/spinner.js'
import TextCard from './category-card.js'
import { useFocusEffect } from '@react-navigation/native'

const selector = (state) => state.texts

export default function Category({ route, navigation }) {
  const { category } = route.params
  const [isLoading, setIsLoading] = useState(true)
  const [shouldReload, setShouldReload] = useState(true)
  const { texts } = useSelector(selector)
  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      if (shouldReload) {
        setIsLoading(true)
        category === 'All' ? dispatch(api.getTexts('')) : dispatch(api.getTexts(category))
        setIsLoading(false)
      }
    }, [category, dispatch, shouldReload])
  )

  const renderItem = ({ item }) => <TextCard text={item} navigation={navigation} setShouldReload={setShouldReload} />

  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <FlatList testID="flatList" data={texts} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </Fragment>
  )
}

Category.propTypes = {
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any
}
