/* eslint-disable unicorn/no-null */
import PropTypes from 'prop-types'
import React, {useState, useCallback} from 'react'
import {Text, useTheme} from 'react-native-paper'

import ArabicWords from './english-arabic-word.js'
import PlaySound from './play-sound.js'
import {transliterateArabicToEnglish} from '../services/utility-service.js'
import {useSharedStyles} from '../styles/common.js'
import {useSelector} from "react-redux";

const transliterationSelector = (state) => state.isTransliterationOn.isTransliterationOn

export const EnglishArabicText = ({
                                      sentence: {arabic, english, words = []} = {},
                                      autoStart,
                                      showRepeat,
                                      showPlay,
                                      setShowRepeat
                                  }) => {
    const theme = useTheme()
    const sharedStyle = useSharedStyles(theme)

    const [currentPlayingWordIndex, setCurrentPlayingWordIndex] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const fileNames = words.map((word) => word.filename)

    const isTransliterationOn = useSelector(transliterationSelector)

    const handlePlayingWord = useCallback((index) => {
        setCurrentPlayingWordIndex(index)
    }, [])

    const handlePlaybackFinished = useCallback(() => {
        setCurrentPlayingWordIndex(null)
    }, [])

    return (
        <>
            <ArabicWords
                sentence={{arabic, english, words}}
                currentPlayingWordIndex={currentPlayingWordIndex}
                setCurrentPlayingWordIndex={setCurrentPlayingWordIndex}
            />
            <Text style={[sharedStyle.englishBody, {color: theme.colors.secondary, fontSize: 21}]}>
                {showRepeat && isTransliterationOn && transliterateArabicToEnglish(arabic)}
            </Text>
            <Text style={[sharedStyle.englishBody, {color: theme.colors.secondary, fontSize: 21}]}>
                {showRepeat && english.charAt(0).toUpperCase() + english.slice(1)}
            </Text>

            <PlaySound
                audioFileNames={fileNames}
                autoStart={autoStart}
                onPlayingWord={handlePlayingWord}
                onFinish={handlePlaybackFinished}
                isPlaying={isPlaying}
                showPlay={showPlay}
                setIsPlaying={setIsPlaying}
                setShowRepeat={setShowRepeat}
            />
        </>
    )
}

EnglishArabicText.propTypes = {
    autoStart: PropTypes.bool,
    sentence: PropTypes.shape({
        arabic: PropTypes.string.isRequired,
        english: PropTypes.string.isRequired,
        filename: PropTypes.string.isRequired,
        words: PropTypes.arrayOf(
            PropTypes.shape({
                filename: PropTypes.string.isRequired
            })
        )
    }).isRequired,
    setShowRepeat: PropTypes.func.isRequired,
    showPlay: PropTypes.bool,
    showRepeat: PropTypes.bool.isRequired
}
