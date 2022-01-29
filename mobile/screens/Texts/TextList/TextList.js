/* eslint-disable import/namespace */
import * as api from '../../../services/ApiService'
import { FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../../../components/Spinner'
import TextCard from './TextCard'
import { useFocusEffect } from '@react-navigation/native'
import { SCREENS } from '../../../constants/screens'

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
            dispatch(api.getTexts('', 25, 0))
          } else {
            dispatch(api.getTexts(category, 50, 0))
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
      key={item.textId}
      onPress={() => {
        setShouldReload(false)
        navigation.navigate(SCREENS.textScreen, {
          textId: item.textId
        })
      }}>
      <TextCard text={item}></TextCard>
    </Pressable>
  )

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <FlatList
        testID="flatList"
        data={texts}
        renderItem={renderItem}
        keyExtractor={(item) => item.textId}
      />
    )
  }
}

TextList.propTypes = {
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any
}
