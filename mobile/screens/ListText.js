/* eslint-disable import/namespace */
import * as api from '../services/ApiService'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import Spinner from '../components/Spinner'
import TextCard from './ListTextCard'
import { useFocusEffect } from '@react-navigation/native'

export default function TextList({ route, navigation }) {
  const { category } = route.params
  const [isLoading, setIsLoading] = useState(true)
  const [shouldReload, setShouldReload] = useState(true)
  const selector = (state) => state.texts
  const { texts } = useSelector(selector)
  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      if (shouldReload) {
        setIsLoading(true)

        category === 'All'
          ? dispatch(api.getTexts(''))
          : dispatch(api.getTexts(category))

        setIsLoading(false)
      }
    }, [category, dispatch, shouldReload])
  )

  const renderItem = ({ item }) => (
    <TextCard
      text={item}
      navigation={navigation}
      setShouldReload={setShouldReload}
    />
  )

  return isLoading ? (
    <Spinner />
  ) : (
    <FlatList
      testID="flatList"
      data={texts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )
}

TextList.propTypes = {
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any
}
