/* eslint-disable import/namespace */
import * as api from '../../../services/ApiService'

import { FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import { SCREENS } from '../../../constants/screens'
import Spinner from '../../../components/Spinner'
import TextCard from './TextCard'
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
        const fetchTexts = () => {
          if (category === 'All') {
            dispatch(api.getTexts(''))
          } else {
            dispatch(api.getTexts(category))
          }
          setTimeout(() => {
            setIsLoading(false)
          }, 1000)
        }
        fetchTexts()
      }
    }, [category, dispatch, shouldReload])
  )

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        setShouldReload(false)
        navigation.navigate(SCREENS.textScreen, {
          textId: item.textId
        })
      }}>
      <TextCard text={item}></TextCard>
    </Pressable>
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
