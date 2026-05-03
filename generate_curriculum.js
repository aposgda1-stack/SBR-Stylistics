const fs = require('fs');

const chapters = [
  {
    "id": "ch1-intro",
    "number": 1,
    "title": "Introduction to Stylistics",
    "estimatedHours": 2,
    "icon": "auto_awesome",
    "status": "not-started",
    "progress": 0,
    "lessons": [
      {
        "id": "poetic-licence",
        "title": "Poetic Licence",
        "subtitle": "The poet's right to bend the rules.",
        "content": [
          {
            "type": "theoretical",
            "content": "### What is Poetic Licence?\n\nPoetic licence is defined as **the poet's right to ignore rules and conventions** generally observed by users of the language.\n\nWhile stylistics tells us about the rules of language, it also explores texts where these rules are deliberately bent to create specific effects. It's the artistic freedom that allows writers to prioritize emotion, rhythm, and aesthetics over strict grammatical correctness."
          }
        ]
      },
      {
        "id": "stylistics-analysis",
        "title": "Stylistics Analysis Basics",
        "subtitle": "How we approach texts in Stylistics.",
        "content": [
          {
            "type": "theoretical",
            "content": "### The Goal of Stylistics\n\nStylistics aims to link the linguistic choices made in a text to the text's ultimate meaning and effect on the reader. By systematically analyzing the language, we can move beyond subjective interpretations and point to specific linguistic evidence for why a text feels or sounds a certain way.\n\nWe look at everything from the sounds of words to the structure of sentences and the organization of entire narratives."
          }
        ]
      }
    ]
  },
  {
    "id": "ch2-levels",
    "number": 2,
    "title": "Levels of Language",
    "estimatedHours": 3,
    "icon": "layers",
    "status": "not-started",
    "progress": 0,
    "lessons": [
      {
        "id": "realization",
        "title": "Realization: Sounds & Marks",
        "subtitle": "Phonology and Graphology.",
        "content": [
          {
            "type": "theoretical",
            "content": "### Levels of Language: Realization\n\nTo analyze how rules are bent or patterned, we must understand the foundational levels of language, starting with how language is realized or made physical:\n\n1. **Phonology (Sounds)**: How a text sounds when spoken. This includes rhythm, rhyme, alliteration, and assonance.\n2. **Graphology (Marks on paper)**: How a text looks visually. This includes layout, typography, punctuation, spelling, and capitalization."
          }
        ]
      },
      {
        "id": "form-meaning",
        "title": "Form & Meaning",
        "subtitle": "Lexicon, Grammar, and Semantics.",
        "content": [
          {
            "type": "theoretical",
            "content": "### Form\n\nForm refers to the structural building blocks of the language:\n1. **Lexicon (Words)**: The vocabulary choices. Why did the author use a specific, rare word instead of a common one?\n2. **Grammar & Syntax**: How words are combined into phrases and sentences. Are the sentences short and punchy, or long and complex?\n\n### Meaning\n\nMeaning is handled at the level of **Semantics**. It deals with the literal meaning of words, as well as metaphor, paradox, and the relationships between ideas in the text."
          }
        ]
      }
    ]
  },
  {
    "id": "ch3-foregrounding",
    "number": 3,
    "title": "Foregrounding",
    "estimatedHours": 4,
    "icon": "highlight",
    "status": "not-started",
    "progress": 0,
    "lessons": [
      {
        "id": "parallelism",
        "title": "Parallelism",
        "subtitle": "Extra regular use of a linguistic feature.",
        "content": [
          {
            "type": "theoretical",
            "content": "### What is Foregrounding?\n\nForegrounding refers to the ways in which certain aspects of a text are made to **stand out or appear prominent** through forms of textual patterning. According to Gibbons & Whiteley (2018), it controls readers' attention and generates literary interpretations.\n\n### Parallelism\n\nParallelism is an extra regular use of a linguistic feature. It involves holding some features constant (usually structure) while varying others (usually words). It requires an element of **identity** and an element of **contrast**.\n\n**Example:** *\"But he was wounded for our transgressions, he was bruised for our iniquities.\"*\n\nHere, the structure *\"He was X-ed for our Y-s\"* is repeated. This pushes readers to perceive semantic relations between words (like wounded/bruised and transgressions/iniquities) even if they don't exist in the language system as a whole. It acts as a powerful force in the cohesion of foregrounding."
          }
        ]
      },
      {
        "id": "deviation-1",
        "title": "Deviation: Lexical & Syntactic",
        "subtitle": "Breaking structural expectations.",
        "content": [
          {
            "type": "theoretical",
            "content": "### Deviation\n\nDeviation disrupts readers’ expectations or patterns established by the text. It can be **External** (against a norm outside the poem) or **Internal** (against the background of the poem itself).\n\n1. **Lexical Deviation**: Involves inventing new words (neologism), using nonce-formations, affixation (e.g., *foresuffer*, *manunkind*), compounding, or functional conversion (adapting an item to a new grammatical function, e.g., using the verb *achieve* as a noun).\n2. **Syntactic Deviation**: Deviating from syntactic constraints, like inverting subject-verb-object order or placing adjectives after nouns to fit a rhyme scheme."
          }
        ]
      },
      {
        "id": "deviation-2",
        "title": "Deviation: Phonological, Graphological, Semantic & Repetition",
        "subtitle": "Manipulating sounds, visuals, and logic.",
        "content": [
          {
            "type": "theoretical",
            "content": "### More Types of Deviation\n\n1. **Phonological Deviation**: Pronouncing or stressing words oddly. Includes elision, aphesis, syncope, apocope, or using strange capitalizations to indicate marked phonetic forms.\n2. **Graphological Deviation**: Manipulating typography, layout, punctuation, and spelling (e.g., splitting letters across lines).\n3. **Semantic Deviation**: Meaning relations that are logically inconsistent or paradoxical, often using metaphor and paradox (e.g., *\"Cold that is the heart's heat\"*).\n\n### Repetition\n\nRepetition is the simplest form of foregrounding. Repeating a word or phrase emphasizes it, giving it a greater, more prolonged force than usual."
          }
        ]
      }
    ]
  },
  {
    "id": "ch4-cohesion",
    "number": 4,
    "title": "Cohesion: Making Texts",
    "estimatedHours": 5,
    "icon": "link",
    "status": "not-started",
    "progress": 0,
    "lessons": [
      {
        "id": "reference-cohesion",
        "title": "Reference Cohesion",
        "subtitle": "The invisible dotted lines that bind texts.",
        "content": [
          {
            "type": "theoretical",
            "content": "### What is Cohesion?\n\nCohesion refers to the linguistic means by which sentences are woven together to make texts. Just as a house needs binding agents to hold bricks together, texts need cohesive ties. In texts, these ties are invisible: they are implicit but palpable connections between words across different sentences.\n\n### Reference Cohesion\n\nReference cohesion covers cases where we use a grammatical word in one sentence in association with a word or phrase in another.\n\n1. **Personal pronouns & Demonstratives**: *he, she, it, this, that, these, those, here, there, then*. Also includes the 'subsequent mention' definite article (*the*).\n2. **Comparative constructions**: Words like *same, similar, such, different, other, more, less*, and ordinal numbers. For instance, in *\"Anil's own religion is different\"*, you must look at the previous sentence to know what it is different *from*."
          }
        ]
      },
      {
        "id": "ellipsis-conjunction",
        "title": "Ellipsis & Conjunction",
        "subtitle": "Omitting the obvious and signposting logic.",
        "content": [
          {
            "type": "theoretical",
            "content": "### Ellipsis\n\nEllipsis occurs when material is left out because its repetition is felt to be unnecessary. The listener/reader must retrieve the missing info from the co-text.\n\n1. **Partial ellipsis (Substitution)**: Replaced by an abridged structure. \n   - Nominal: *one/ones, the same*\n   - Verbal: *do, be, have, do so*\n   - Clausal: *so, not*\n2. **Full ellipsis (Zero anaphora)**: Full omission marked by a gap. Words like *some, any, most, all* often sit adjacent to the gap. Full clausal ellipsis occurs in polar rejoinders (*Yes/No*) or after verbs of cognition (*\"I know [ ]\"*).\n\n### Conjunction\n\nConjunction cohesion uses words/phrases at the beginning of a sentence to clarify the semantic or logical relationship with the previous info. It acts as a semantic signpost.\n\n- **Additive**: *and, furthermore, similarly*\n- **Adversative**: *yet, but, however, conversely*\n- **Causal**: *so, therefore, as a result*\n- **Temporal**: *then, next, meanwhile, finally*\n- **Continuative**: *now, of course, well, anyway*"
          }
        ]
      },
      {
        "id": "lexical-cohesion",
        "title": "Lexical Cohesion",
        "subtitle": "Word associations that build meaning.",
        "content": [
          {
            "type": "theoretical",
            "content": "### Lexical Cohesion\n\nLexical cohesion is the recurrent use of the same content word, or of related words, conveying a sense of the integratedness of a text. It relies on the probability of words naturally co-occurring in the same text.\n\nTypes of lexical cohesion:\n1. **Simple repetition**: Using the exact same word.\n2. **Synonymy**: Using a synonym or near-synonym (e.g., *chair ... seat*).\n3. **Superordinate/Subordinate terms**: Using general or specific category words (e.g., *rabbit ... pet ... animal*).\n4. **Collocation**: Words that have a high tendency to co-occur (e.g., *strong tea*, *bacon and eggs*)."
          }
        ]
      }
    ]
  },
  {
    "id": "ch5-modality",
    "number": 5,
    "title": "Modality and Attitude",
    "estimatedHours": 4,
    "icon": "psychology",
    "status": "not-started",
    "progress": 0,
    "lessons": [
      {
        "id": "modality-parameters",
        "title": "Parameters of Modality",
        "subtitle": "Expressing opinion and attitude in language.",
        "content": [
          {
            "type": "theoretical",
            "content": "### What is Modality?\n\nModality is the linguistic cover term for the ways a speaker expresses 'opinion or attitude'. It denotes the linguistic means available for qualifying any claim or commitment.\n\nWe focus on four main parameters of modality:\n1. **Probability**: *She certainly is interesting. / It might rain.*\n2. **Obligation**: *You must be patient. / The Senate must win tonight.*\n3. **Willingness**: *I would do it. / Would you give me a hand?*\n4. **Usuality**: *I rarely meet people like this. / Gdansk is usually in Poland.*"
          }
        ]
      },
      {
        "id": "modal-verbs",
        "title": "Modal Verbs & Futurity",
        "subtitle": "How auxiliary verbs qualify our statements.",
        "content": [
          {
            "type": "theoretical",
            "content": "### Modal Verbs\n\nThe most grammatically established way of adding qualifications is by using modal auxiliaries: *can, would, may, might, must, should, ought to*.\n\nThese verbs fall into scales of intensity. For example:\n- *Yeltsin might fall.* (weak possibility)\n- *Yeltsin will probably fall.* (strong probability)\n- *Yeltsin must fall.* (near-certainty)\n\n### The Meaning of Will: Modality or Futurity?\n\nThe verb *will* can carry two modality meanings:\n1. **Probability**: *That lad will come to a sticky end.*\n2. **Willingness**: *Will you have some tea?*\n\nHowever, on some occasions, *will* carries almost no modality and is purely a marker of **unmodalized future reference** (e.g., *\"At 6:17 GMT there will be a partial lunar eclipse\"*). These are non-negotiable statements where the speaker's judgment isn't the focus."
          }
        ]
      },
      {
        "id": "modal-adverbs",
        "title": "Modal Adverbs & Advanced Modality",
        "subtitle": "Adverbs and verbs of cognition.",
        "content": [
          {
            "type": "theoretical",
            "content": "### Modal Adverbs\n\nThe second commonest way of expressing modality is by means of modal adverbs: *probably, possibly, certainly, necessarily, usually, always, definitely, surely*.\n\nEven strong adverbs like *definitely* (e.g., *\"I definitely saw Jim take it\"*) show that the statement is less absolute than a pure factual claim (*\"I saw Jim take it\"*), because the speaker feels the need to assert their certainty.\n\n### Metaphorized or 'Advanced' Modality\n\nEnglish uses verbs of cognition to encode probability, obligation, or willingness:\n- *I don't believe we've met.* (Probability)\n- *I reckon it's going to rain.* (Probability)\n\nHere, the speaker is not reporting a literal process of 'believing', but rather expressing their subjective modality regarding the statement."
          }
        ]
      }
    ]
  },
  {
    "id": "ch6-pragmatics",
    "number": 6,
    "title": "Dialogue, Drama & Pragmatics",
    "estimatedHours": 6,
    "icon": "forum",
    "status": "not-started",
    "progress": 0,
    "lessons": [
      {
        "id": "cooperative-principle",
        "title": "The Cooperative Principle & Maxims",
        "subtitle": "Grice's maxims and reading between the lines.",
        "content": [
          {
            "type": "theoretical",
            "content": "### The Cooperative Principle (CP)\n\nProposed by H. Paul Grice, the CP is a basic assumption that speakers normally intend to accomplish purposeful and effective communication. To observe the CP, speakers follow four Conversational Maxims:\n\n1. **Maxim of Quality**: Make your contribution true; don't say false things.\n2. **Maxim of Quantity**: Be as informative as required—don't say too much or too little.\n3. **Maxim of Relation (Relevance)**: Say things that are relevant.\n4. **Maxim of Manner**: Be clear; avoid obscurity and ambiguity.\n\n### Flouting Maxims & Implicature\n\nSpeakers often 'flout' (blatantly depart from) these maxims to convey covert meanings, called **implicatures**.\n- *Flouting Quality*: Sarcasm, metaphors (e.g., \"You've failed.\" -> \"Terrific!\").\n- *Flouting Quantity*: Being overly brief to imply disapproval, or over-informative.\n- *Flouting Relation*: Changing the subject to drop a hint (e.g., answering a question with an unrelated statement to avoid answering).\n- *Flouting Manner*: Being deliberately obscure (e.g., spelling words out in front of a toddler)."
          }
        ]
      },
      {
        "id": "politeness",
        "title": "Politeness Theory & Face",
        "subtitle": "Brown & Levinson's framework for social interaction.",
        "content": [
          {
            "type": "theoretical",
            "content": "### The Concept of Face\n\nBrown & Levinson's theory is built around 'face'—an individual's self-esteem and public self-image.\n\n- **Positive Face**: The desire to be liked, appreciated, and approved of by others.\n- **Negative Face**: The desire not to be coerced, encroached upon, or impeded (the desire for freedom from imposition).\n\nA **Face Threatening Act (FTA)** is any utterance that threatens face (e.g., requests, criticisms).\n\n### Politeness Strategies\n\nWhen performing an FTA, speakers use strategies:\n1. **Bald On-Record**: Direct, unmitigated (e.g., *\"Open the window.\"*). High efficiency, high risk.\n2. **Off-Record**: Avoiding explicit mention, dropping a hint (e.g., *\"It's hot in here.\"*). Low risk, low efficiency.\n3. **Negative Politeness**: Mitigating the threat to negative face. Strategies include indirectness (*\"Could you...?\"*), hedging, being pessimistic (*\"I don't suppose...\"*), apologizing, impersonalizing, or acknowledging debt.\n4. **Positive Politeness**: Showing approval to mitigate threats. Strategies include complimenting the hearer, using in-group markers (*\"mate, dear\"*), claiming common ground, or seeking agreement."
          }
        ]
      },
      {
        "id": "speech-acts-narrative",
        "title": "Speech Acts & Narrative Structure",
        "subtitle": "Analyzing discourse and stories.",
        "content": [
          {
            "type": "theoretical",
            "content": "### Speech Acts\nActions performed via utterances. \n- **Locutionary act**: Producing a meaningful expression.\n- **Illocutionary act**: The communicative force or intended function.\n- **Perlocutionary act**: The effect it has on the hearer.\n\nTypes of speech acts:\n- **Declarations**: Change the world (e.g., \"I pronounce you guilty.\").\n- **Representatives**: State beliefs (assertions, facts).\n- **Expressives**: State feelings (apologies, thanks).\n- **Directives**: Get someone to do something (commands, requests).\n- **Commissives**: Commit to future action (promises, threats).\n\n### Labov's Narrative Structure\n1. **Abstract**: Summary of the story.\n2. **Orientation**: Who, when, where.\n3. **Complicating Action**: Main events.\n4. **Evaluation**: Why the story is worth telling (internal/external).\n5. **Resolution**: How it ends.\n6. **Coda**: Returns the listener to the present."
          }
        ]
      }
    ]
  }
];

fs.writeFileSync('C:\\\\Users\\\\hp\\\\.gemini\\\\antigravity\\\\scratch\\\\src\\\\data\\\\chapters.json', JSON.stringify(chapters, null, 2));
console.log('Chapters written successfully! Now 6 chapters.');
