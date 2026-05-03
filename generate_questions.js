const fs = require('fs');

const quizQuestions = [
  // Chapter 1
  {
    "id": "q-ch1-1",
    "quizId": "quiz-ch1",
    "question": "What is 'Poetic Licence'?",
    "options": [
      "The poet's right to ignore rules and conventions generally observed by users of the language",
      "A legal permission to publish poems",
      "The use of metaphors in everyday language",
      "Translating poetry"
    ],
    "correctIndex": 0,
    "explanation": "Poetic Licence is the poet's right to bend or break linguistic rules for artistic effect.",
    "type": "theoretical"
  },
  // Chapter 2
  {
    "id": "q-ch2-1",
    "quizId": "quiz-ch2",
    "question": "Which level of language deals with 'Marks on paper'?",
    "options": ["Phonology", "Graphology", "Lexicon", "Semantics"],
    "correctIndex": 1,
    "explanation": "Graphology is the visual representation of language on paper.",
    "type": "theoretical"
  },
  // Chapter 3
  {
    "id": "q-ch3-1",
    "quizId": "quiz-ch3",
    "question": "Identify the type of deviation: Using 'foresuffer' or 'manunkind'.",
    "options": ["Syntactic Deviation", "Lexical Deviation", "Semantic Deviation", "Graphological Deviation"],
    "correctIndex": 1,
    "explanation": "Creating new words via affixation is an example of Lexical Deviation.",
    "type": "applied"
  },
  // Chapter 4
  {
    "id": "q-ch4-1",
    "quizId": "quiz-ch4",
    "question": "Which of the following is a type of Cohesion?",
    "options": ["Foregrounding", "Reference", "Deviation", "Politeness"],
    "correctIndex": 1,
    "explanation": "Reference is one of the main cohesive ties (along with ellipsis, conjunction, and lexical cohesion).",
    "type": "theoretical"
  },
  // Chapter 5
  {
    "id": "q-ch5-1",
    "quizId": "quiz-ch5",
    "question": "Which modal verb typically expresses strong obligation or near-certainty?",
    "options": ["Might", "Could", "Must", "Would"],
    "correctIndex": 2,
    "explanation": "'Must' is used for strong obligation or high probability.",
    "type": "applied"
  },
  // Chapter 6
  {
    "id": "q-ch6-1",
    "quizId": "quiz-ch6",
    "question": "Identify the Politeness Strategy: 'What a fantastic garden you have.'",
    "options": ["Negative Politeness", "Positive Politeness", "Bald on-record", "Off-record"],
    "correctIndex": 1,
    "explanation": "Complimenting the hearer attends to their Positive Face (the desire to be liked and approved of).",
    "type": "applied"
  },
  {
    "id": "q-ch6-2",
    "quizId": "quiz-ch6",
    "question": "A: 'Do you like my new dress?' B: 'Well, it is very pink.' Which maxim is flouted?",
    "options": ["Maxim of Quality", "Maxim of Quantity", "Maxim of Manner", "Maxim of Relation"],
    "correctIndex": 1,
    "explanation": "B doesn't give enough information (Quantity) or changes the subject slightly (Relation), implying they don't like it.",
    "type": "applied"
  },
  {
    "id": "q-ch6-3",
    "quizId": "quiz-ch6",
    "question": "Identify the Politeness Strategy: 'Close the window.'",
    "options": ["Negative Politeness", "Positive Politeness", "Bald on-record", "Off-record"],
    "correctIndex": 2,
    "explanation": "Bald on-record is direct, clear, and makes no attempt to mitigate the face threat.",
    "type": "applied"
  },
  {
    "id": "q-ch6-4",
    "quizId": "quiz-ch6",
    "question": "Identify the Politeness Strategy: 'I'm sorry to bother you, but could you possibly pass the salt?'",
    "options": ["Negative Politeness", "Positive Politeness", "Bald on-record", "Off-record"],
    "correctIndex": 0,
    "explanation": "Apologizing and using indirectness mitigates the threat to the hearer's freedom of action (Negative Face).",
    "type": "applied"
  },
  {
    "id": "q-ch6-5",
    "quizId": "quiz-ch6",
    "question": "What is an Illocutionary Act?",
    "options": ["Producing a meaningful sound", "The communicative force or intended function of an utterance", "The effect the utterance has on the hearer", "A grammatical rule"],
    "correctIndex": 1,
    "explanation": "The illocutionary act is the intended function (e.g., promising, commanding).",
    "type": "theoretical"
  }
];

const examQuestions = [
  {
    "id": "ex-1",
    "question": "Discuss the kinds of Cohesion in Stylistics.",
    "options": [
      "Deviation, Parallelism, Repetition",
      "Reference, Ellipsis, Conjunction, Lexical Cohesion",
      "Positive Face, Negative Face, Bald On-Record",
      "Phonology, Graphology, Lexicon"
    ],
    "correctIndex": 1,
    "explanation": "Cohesion involves Reference (pronouns), Ellipsis (omission), Conjunction (logical connectors), and Lexical (word relations).",
    "type": "theoretical"
  },
  {
    "id": "ex-2",
    "question": "What is the difference between Negative Face and Positive Face?",
    "options": [
      "Negative face is being rude; positive face is being polite.",
      "Negative face is the desire for freedom of action; positive face is the desire to be approved of.",
      "Negative face uses bad words; positive face uses good words.",
      "There is no difference."
    ],
    "correctIndex": 1,
    "explanation": "Positive face = desire to be liked. Negative face = desire to not be imposed upon.",
    "type": "theoretical"
  },
  {
    "id": "ex-3",
    "question": "Identify the Politeness Strategy: 'Could you please open the door?'",
    "options": ["Bald on-record", "Positive Politeness", "Negative Politeness", "Off-record"],
    "correctIndex": 2,
    "explanation": "Using 'could you please' minimizes the imposition, appealing to Negative Face.",
    "type": "applied"
  },
  {
    "id": "ex-4",
    "question": "A: 'Where is the remote?' B: 'It's a beautiful day outside.' Which maxim is flouted?",
    "options": ["Quality", "Quantity", "Relation", "Manner"],
    "correctIndex": 2,
    "explanation": "The answer is completely irrelevant to the question, flouting the Maxim of Relation.",
    "type": "applied"
  },
  {
    "id": "ex-5",
    "question": "Which of the following is an example of Graphological Deviation?",
    "options": [
      "Inventing a new word",
      "Splitting a word across two lines (e.g., win- / dow)",
      "Using a metaphor",
      "Saying something sarcastic"
    ],
    "correctIndex": 1,
    "explanation": "Graphological deviation manipulates the visual layout or spelling of the text on the page.",
    "type": "applied"
  },
  {
    "id": "ex-6",
    "question": "Identify the deviation: 'Her Kindling buds as if she Autumn were.'",
    "options": ["Lexical", "Graphological", "Syntactic", "Phonological"],
    "correctIndex": 2,
    "explanation": "The unusual word order (verb at the end) is Syntactic Deviation (inversion).",
    "type": "applied"
  },
  {
    "id": "ex-7",
    "question": "What is the function of the 'Coda' in Labov's Narrative Structure?",
    "options": [
      "To summarize the story",
      "To provide background info",
      "To return the listener from the story world to the present",
      "To explain the climax"
    ],
    "correctIndex": 2,
    "explanation": "The coda bridges the gap between the end of the narrative and the present conversational context.",
    "type": "theoretical"
  },
  {
    "id": "ex-8",
    "question": "Which conjunction type is used in: 'He was late; therefore, he missed the train.'",
    "options": ["Additive", "Adversative", "Causal", "Temporal"],
    "correctIndex": 2,
    "explanation": "'Therefore' indicates a cause-and-effect relationship.",
    "type": "applied"
  },
  {
    "id": "ex-9",
    "question": "In 'John bought a car, and so did I', what type of cohesive device is 'so did'?",
    "options": ["Reference", "Lexical substitution", "Verbal substitution", "Ellipsis"],
    "correctIndex": 2,
    "explanation": "'So did' substitutes for the verb phrase 'bought a car'.",
    "type": "applied"
  },
  {
    "id": "ex-10",
    "question": "Which of these expresses Modality of 'Probability'?",
    "options": ["You must finish this.", "I would help you.", "It will likely rain tomorrow.", "I usually wake up early."],
    "correctIndex": 2,
    "explanation": "'Likely' expresses the probability of an event occurring.",
    "type": "applied"
  }
];

fs.writeFileSync('C:\\\\Users\\\\hp\\\\.gemini\\\\antigravity\\\\scratch\\\\src\\\\data\\\\quiz-questions.json', JSON.stringify(quizQuestions, null, 2));
fs.writeFileSync('C:\\\\Users\\\\hp\\\\.gemini\\\\antigravity\\\\scratch\\\\src\\\\data\\\\exam-questions.json', JSON.stringify(examQuestions, null, 2));
console.log('Quiz and Exam questions updated.');
