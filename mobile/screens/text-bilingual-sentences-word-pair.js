/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Divider, Text, Button, useTheme } from 'react-native-paper'
import PlaySound from '../components/play-sound.js'
import { useSharedStyles } from '../styles/common.js'
import ModalScrollView from '../components/modal-scroll-view.js'
import { formatGrammar } from '../services/ui-services.js'

const EXPLAIN = 'EXAMINE'

const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15
  }
})

function TextBilingualSentencesWords({ word }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [visible, setVisible] = React.useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const explanation = (
    <Text style={{ ...sharedStyle.englishBody, fontSize: 19, lineHeight: 29 }}>
      {formatGrammar(word.grammar, sharedStyle)}
    </Text>
  )

  return (
    <Fragment>
      <View style={styles.row}>
        <View style={styles.flexOne}>
          <Text style={sharedStyle.arabicHeading}>{word.arabic}</Text>
          <Text style={{ marginRight: 30, color: theme.colors.onSurfaceVariant }}>
            {word.english.charAt(0).toUpperCase() + word.english.slice(1)}
          </Text>
        </View>
        <View style={styles.flexOne}>
          <PlaySound audioFileName={word.filename} buttonText={'PLAY'} />
          <Button mode="elevated" textColor={theme.colors.tertiary} onPress={showModal} icon="eye-outline">
            {EXPLAIN}
          </Button>
        </View>
      </View>
      <ModalScrollView
        visible={visible}
        content=<View style={{ margin: 5, padding: 5 }}>
          <Text variant="bodyLarge">{explanation ?? 'No explanation available'}</Text>
        </View>
        title={word.arabic}
        hideModal={hideModal}
        height="82%"
      />
      <Divider />
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
