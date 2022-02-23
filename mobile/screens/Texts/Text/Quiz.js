/* eslint-disable import/namespace */
import React from 'react'
import ChipText from '../../../components/ChipText'
import { useSelector } from 'react-redux'
import Spinner from '../../../components/Spinner'
import { StyleSheet, View } from 'react-native'

const Quiz = () => {
  const selector = (state) => state.text
  const { text } = useSelector(selector)

  const [selectedState, setSelected] = React.useState()
  const setFunc = () => setSelected((value) => !value)

  const styles = StyleSheet.create({
    chip: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10
    }
  })

  if (text.title) {
    const chips = text.vocabularyCollection.arabic.map((arabic) => (
      <ChipText
        onPress={console.log('test')}
        key={arabic.wordId}
        text={arabic.word}
        func={setFunc}
        selected={selectedState}
      />
    ))

    return <View style={styles.chip}>{chips}</View>
  }
  return <Spinner />
}

export default Quiz
