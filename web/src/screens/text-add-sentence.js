import {Chip, TextField, Box, Button} from '@mui/material'
import {Fragment} from 'react'
import {styled} from '@mui/material/styles'
import {useDispatch, useSelector} from 'react-redux'
import * as apiService from '../services/api-service.js'
import * as React from 'react'
import * as wordProcessing from '../services/word-processing.js'
import LoadingButton from '@mui/lab/LoadingButton'
import MatchingIndicator from '../components/matching-indicator.js'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

const Item = styled(Paper)(({theme}) => ({
    padding: theme.spacing(1),
    width: 1100
}))

const selector = (state) => state.text

//A function that checks if there are any empty lines in the text
const checkForEmptyLines = (text) => {
    //Get the arabic and english text from the text object
    const arabicText = text.texts.arabic
    const englishText = text.texts.english

    //Check if there are any empty lines in the arabic text
    const emptyLineArabic = arabicText.match(/^\s*$/gm)

    //Check if there are any empty lines in the english text
    const emptyLineEnglish = englishText.match(/^\s*$/gm)

    //Check if there are any empty lines in either text, and return true if there are
    if (emptyLineArabic || emptyLineEnglish) {
        return true
    }
}

const TextAddSentences = () => {
    const dispatch = useDispatch()
    const {text} = useSelector(selector)
    const [englishSentenceCount, setEnglishSentenceCount] = React.useState(0)
    const [arabicSentenceCount, setArabicSentenceCount] = React.useState(0)
    const [numberOfArabicLetters, setNumberOfArabicLetters] = React.useState(0)
    const [loading, setLoading] = React.useState(false)

    const handleClick = () => {
        setLoading(true)
        apiService
            .getVowels(text.texts.arabic)
            .then((data) => {
                dispatch({type: 'SET_ARABIC_TEXT', arabic: data})
                setLoading(false)
            })
            .catch((error) => console.log(error))
    }

    function handleChangeEnglish(event) {
        // Split text into sentences
        const englishSentence = wordProcessing.splitTextToSentences(event.target.value)
        setEnglishSentenceCount(englishSentence.length)

        //loop through all the sentences and remove any " using regex and then update the englishSentence
        for (let i = 0; i < englishSentence.length; i++) {
            englishSentence[i] = englishSentence[i].replace(/"/g, '')
        }

        // Split sentences into words
        const englishWords = []

        for (const sentence of englishSentence) {
            const theEnglishWordsSentence = wordProcessing.splitSentencesToWords(sentence)
            englishWords.push(theEnglishWordsSentence)
        }

        // Update the state
        dispatch({type: 'SET_ENGLISH_TEXT', english: event.target.value})
        dispatch({type: 'SET_ENGLISH_SENTENCE', englishSentence})
        dispatch({type: 'SET_ENGLISH_WORDS', englishWords})
    }

    function handleChangeArabic(event) {
        const arabicSentence = wordProcessing.splitTextToSentences(event.target.value)
        const cleanWords = wordProcessing.cleanWordFromInvalidCharacters(event.target.value)
        const arabicSentencesProcessed = wordProcessing.splitTextToSentences(cleanWords)
        const cleanArabicText = wordProcessing.cleanWordFromInvalidCharactersForSentenceAndText(event.target.value)

        setArabicSentenceCount(arabicSentencesProcessed.length)

        const arabicWords = []

        for (const sentence of arabicSentencesProcessed) {
            const cleanSentence = wordProcessing.cleanWordFromInvalidCharactersForSentenceAndText(sentence)
            const theArabicWordsSentence = wordProcessing.splitSentencesToWords(cleanSentence)
            const cleanFromNullAndEmpty = wordProcessing.removeEmptyAndNull(theArabicWordsSentence)
            const lastVowelRemoved = wordProcessing.removeLastVowel(cleanFromNullAndEmpty)

            arabicWords.push(lastVowelRemoved)
        }

        //loop through the sentences and remove non arabic characters
        const arabicSentences = []

        for (const sentence of arabicSentence) {
            const cleanSentence = wordProcessing.cleanWordFromInvalidCharacters(sentence)
            arabicSentences.push(cleanSentence)
        }

        dispatch({type: 'SET_ARABIC_TEXT', arabic: cleanArabicText})
        dispatch({type: 'SET_ARABIC_SENTENCE', arabicSentence: arabicSentences})
        dispatch({type: 'SET_ARABIC_WORDS', arabicWords})
    }

    const englishSentencesCountMessage = `English: ${englishSentenceCount}`
    const arabicSentencesCountMessage = `Arabic: ${arabicSentenceCount}`

    return (
        <Fragment>
            <Stack direction="row" spacing={2}>
                <MatchingIndicator
                    entity="Sentences"
                    firstCondition={englishSentenceCount}
                    secondCondition={arabicSentenceCount}
                />
                <Chip label={englishSentencesCountMessage}/>
                <Chip label={arabicSentencesCountMessage}/>
                <Chip label={`Number of Arabic Letters: ${numberOfArabicLetters}`}/>
                {checkForEmptyLines(text) && <Chip label="Empty line detected" color="error"/>}
                <Button
                    size="small"
                    variant="outlined"
                    onClick={async () => {
                        //count the number of letters in text.texts.arabic excluding the spaces and line breaks
                        const numberOfLetters = text.texts.arabic.replace(/ /g, '').replace(/\n/g, '').length
                        setNumberOfArabicLetters(numberOfLetters)
                        dispatch({type: 'SET_NUMBER_OF_WORDS', number: numberOfLetters})
                    }}
                >
                    Check Number of Letters
                </Button>

                <Button
                    size="small"
                    variant="outlined"
                    onClick={async () => {

                        const replaceSacredPhrase = text.texts.arabic.replace(/صلى الله عليه و\s?سلم/g, 'ﷺ');

                        const consolidateSpaces = replaceSacredPhrase.replace(/ {2,}/g, ' ');

                        const trimmedText = consolidateSpaces.replace(/^\s+|\s+$/gm, '');

                        //update the state
                        dispatch({type: 'SET_ARABIC_TEXT', arabic: trimmedText})
                    }}
                >
                    Correct Texts
                </Button>

                <LoadingButton
                    size="small"
                    onClick={handleClick}
                    disabled
                    loading={loading}
                    loadingIndicator="Loading..."
                    variant="outlined"
                >
                    Fetch vocals
                </LoadingButton>

                <Box>{'ﷺ'}</Box>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Item>
                    <div dir="rtl">
                        <TextField
                            InputProps={{style: {fontSize: 30, lineHeight: 1.65}}}
                            value={text.texts.arabic}
                            label="Arabic"
                            multiline
                            rows={21}
                            fullWidth
                            variant="filled"
                            onChange={handleChangeArabic}
                        />
                    </div>
                </Item>
                <Item>
                    <TextField
                        InputProps={{style: {fontSize: 20, lineHeight: 2.47}}}
                        value={text.texts.english}
                        label="English"
                        multiline
                        rows={21}
                        fullWidth
                        variant="filled"
                        onChange={handleChangeEnglish}
                    />
                </Item>
            </Stack>
        </Fragment>
    )
}

export default TextAddSentences
