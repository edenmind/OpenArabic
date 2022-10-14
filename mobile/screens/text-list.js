/* eslint-disable import/namespace */
import * as api from '../services/api-service.js'

import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import Spinner from '../components/spinner.js'
import TextListCard from './text-list-card.js'
import { useFocusEffect } from '@react-navigation/native'

const selector = (state) => state.texts
const textsLoadSelector = (state) => state.textsLoading

export default function TextList({ route, navigation }) {
  const { category } = route.params
  const [shouldReload, setShouldReload] = useState(true)
  const { texts } = useSelector(selector)
  const { textsLoading } = useSelector(textsLoadSelector)
  const dispatch = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      if (shouldReload) {
        category === 'All' ? dispatch(api.getTexts()) : dispatch(api.getTexts(category))
      }
    }, [category, dispatch, shouldReload])
  )

  const renderItem = ({ item }) => (
    <TextListCard text={item} navigation={navigation} setShouldReload={setShouldReload} />
  )

  return textsLoading ? (
    <Fragment>
      <FlatList testID="flatList" data={texts} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </Fragment>
  ) : (
    <Spinner />
  )
}

TextList.propTypes = {
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any
}
