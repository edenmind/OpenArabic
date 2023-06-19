/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Text, Button, useTheme } from 'react-native-paper'
import PlaySound from '../components/play-sound.js'
import { useSharedStyles } from '../styles/common.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import { formatGrammar } from '../services/ui-services.js'
import UI from '../constants/ui.js'

const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 10
  }
})

function TextBilingualSentencesWords({ word }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [visible, setVisible] = React.useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const explanation = formatGrammar(word.grammar, sharedStyle)

  return (
    <Fragment>
      <View style={styles.row}>
        <View style={styles.flexOne}>
          <Text style={{ ...sharedStyle.arabicHeading, fontSize: 35, direction: 'rtl' }}>{word.arabic}</Text>
          <Text style={{ marginRight: 30, color: theme.colors.onSurface, fontSize: 17 }}>
            {word.english.charAt(0).toUpperCase() + word.english.slice(1)}
          </Text>
        </View>
        <View style={styles.flexOne}>
          <PlaySound audioFileName={word.filename} buttonText={UI.play} />
          <Button mode="elevated" textColor={theme.colors.tertiary} onPress={showModal} icon="eye-outline">
            {UI.explain}
          </Button>
        </View>
      </View>
      <ModalScrollView
        visible={visible}
        content={explanation ?? <Text>'No explanation available'</Text>}
        title={word.arabic}
        hideModal={hideModal}
        height="87%"
      />
    </Fragment>
  )
}

TextBilingualSentencesWords.propTypes = {
  word: PropTypes.shape({
    arabic: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    grammar: PropTypes.string
  }).isRequired
}

export default TextBilingualSentencesWords
