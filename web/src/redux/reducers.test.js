import reducers from './reducers.js'

test('reducers SET_ENGLISH_WORDS', () => {
  const state = reducers(
    {
      text: {
        arabic: [''],
        english: [''],
        status: 'Draft',
        publishAt: new Date().toUTCString(),
        wordByWord: [['']],
        title: '',
        texts: { arabic: '', english: '' },
        category: '',
        author: '',
        arabicSentence: [''],
        source: '',
        // eslint-disable-next-line putout/objects-braces-inside-array
        sentences: [
          {
            english: '',
            arabic: '',
            words: []
          }
        ]
      }
    },
    { type: 'SET_ENGLISH_WORDS', englishWords: [['englishWords']] }
  )
  expect(state).toEqual({
    text: {
      arabic: [''],
      english: [''],
      status: 'Draft',
      publishAt: new Date().toUTCString(),
      wordByWord: [['']],
      title: '',
      texts: { arabic: '', english: '' },
      category: '',
      author: '',
      arabicSentence: [''],
      source: '',
      englishWords: [['englishWords']],
      // eslint-disable-next-line putout/objects-braces-inside-array
      sentences: [
        {
          english: '',
          arabic: '',
          words: []
        }
      ]
    }
  })
})

test('reducers SET_ENGLISH_SENTENCE', () => {
  const state = reducers(
    {
      text: {
        arabic: [''],
        english: [''],
        status: 'Draft',
        publishAt: new Date().toUTCString(),
        wordByWord: [['']],
        title: '',
        texts: { arabic: '', english: '' },
        category: '',
        author: '',
        arabicSentence: [''],
        source: '',
        // eslint-disable-next-line putout/objects-braces-inside-array
        sentences: [
          {
            english: '',
            arabic: '',
            words: []
          }
        ]
      }
    },
    { type: 'SET_ENGLISH_SENTENCE', englishSentence: ['englishSentence'] }
  )
  expect(state).toEqual({
    text: {
      arabic: [''],
      english: [''],
      status: 'Draft',
      publishAt: new Date().toUTCString(),
      wordByWord: [['']],
      title: '',
      texts: { arabic: '', english: '' },
      category: '',
      author: '',
      arabicSentence: [''],
      source: '',
      englishSentence: ['englishSentence'],
      // eslint-disable-next-line putout/objects-braces-inside-array
      sentences: [
        {
          english: '',
          arabic: '',
          words: []
        }
      ]
    }
  })
})

test('reducers  SET_STATUS', () => {
  const state = reducers(
    {
      text: {
        arabic: [''],
        english: [''],
        status: 'Draft',
        publishAt: new Date().toUTCString(),
        wordByWord: [['']],
        title: '',
        texts: { arabic: '', english: '' },
        category: '',
        author: '',
        arabicSentence: [''],
        source: '',
        // eslint-disable-next-line putout/objects-braces-inside-array
        sentences: [
          {
            english: '',
            arabic: '',
            words: []
          }
        ]
      }
    },
    { type: 'SET_STATUS', status: 'Published' }
  )
  expect(state).toEqual({
    text: {
      arabic: [''],
      english: [''],
      status: 'Published',
      publishAt: new Date().toUTCString(),
      wordByWord: [['']],
      title: '',
      texts: { arabic: '', english: '' },
      category: '',
      author: '',
      arabicSentence: [''],
      source: '',
      // eslint-disable-next-line putout/objects-braces-inside-array
      sentences: [
        {
          english: '',
          arabic: '',
          words: []
        }
      ]
    }
  })
})
