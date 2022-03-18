/* eslint-disable import/namespace */
import 'react-native-gesture-handler'
import { FlatList, Pressable } from 'react-native'
import React from 'react'
import TextItem from '../../../components/TextItem'
import Spinner from '../../../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { RESET_TEXTS } from '../../../redux/actions'
import { SCREENS } from '../../../constants/screens'

export default function TextRelated({ navigation }) {
  const selector = (state) => state.text
  const { text } = useSelector(selector)
  const dispatch = useDispatch()

  const switchScreen = (item) => {
    dispatch({
      type: RESET_TEXTS,
      payload: null
    })
    navigation.navigate(SCREENS.textScreen, {
      textId: item.textId
    })
    navigation.navigate(SCREENS.bilingual)
  }

  const renderItem = ({ item }) => (
    <Pressable
      key={item.textId}
      onPress={() => {
        switchScreen(item)
      }}>
      <TextItem title={item.title} />
    </Pressable>
  )

  if (text.title) {
    return (
      <FlatList
        data={text.relatedTexts}
        renderItem={renderItem}
        keyExtractor={(item) => item.textId}
      />
    )
  }
  return <Spinner />
}

TextRelated.propTypes = {
  navigation: PropTypes.any.isRequired
}
