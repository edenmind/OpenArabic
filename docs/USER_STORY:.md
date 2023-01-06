User Story
As a Language Learner,
I want to see a sentence in the language that I know (English)
and select words from a shuffled list of words in the language that I don't know (Arabic)
until I have selected all the words from the shuffled list to form a sentence in the correct order
so that I can improve my understanding of the language and practice forming sentences.

Acceptance Criteria:

- When selecting the wrong word, the user should be warned
- When selecting the correct word, the word should be removed from the shuffled list
- When the correct sentence has been produced, the shuffled list should be empty
- When the correct sentence has been produced, all the words in the language that I don't know should be visible in the correct order

System Architecture:

- The application is built using React Native (for both Android and iOS), JavaScript, and Redux for storing global state.
- Data exchange is done using JSON objects.
- The application supports CRUD (Create, Read, Update, Delete) operations with an API service built with Fastify.
- Axios is used for making HTTP requests and handling responses.
- All functions and services for communication with the public API are stored in library services.
- React components are kept clean and organized.
- All logic is stored in service libraries.
- The API is public, and no libraries are used for authentication or authorization.
- Data is validated in the backend API with JSON schemas.
- The MongoDB database is hosted on Digital Ocean and contains collections for authors, categories, texts, and words.
- React Native Paper is used as a UI library.

Data Structure:

- Array of "sentences" that is an object that has properties "english" and "arabic" which are strings

Technical Information:

- The text is available in the redux reducer "text"
- The text contains the sentences
- A list of words can be produced from the sentence string
- No need to communicate with the API

Task:
Suggest a list of functions (with function names, inputs, outputs, pseudo logic, the source for the inputs, and expected behavior) that will be used to implement the User Story taking the System Architecture and the Data Structure into account.

Task:

- Create a React Native Functional component for these 4 functions by taking the user Story, System Architecture, Data Structure, and Technical Information into account
- The name of the component should be OrderingWordsInASentence
- Create more functions if necessary
- Produce code according to the following principles:
• Utilize stateless components when appropriate
• Break down large components into smaller, reusable components
• Use functional components when possible
• Leverage React Native libraries and extensions when appropriate
• Make sure that the code can be tested
• Use clean code principles
• Only read the text from redux, then use local state
• No need to contact the API
• Use as little styling as possible
• make sure that all import statements are used and correct
• make sure that all functions are used
• avoid using external libraries
• move functions into callbacks hooks in useEffect to avoid rerendering
• use a named selector function for useSelector should

Before ending: make sure that all functions are accessed and that all imports are used, it not, investigate why and make corrections
