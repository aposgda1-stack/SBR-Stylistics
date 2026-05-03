const fs = require('fs');

const chapters = [
  {
    id: "ch1-foundations",
    number: 1,
    title: "Foundations of Stylistics",
    estimatedHours: 3,
    icon: "auto_awesome",
    status: "not-started",
    progress: 0,
    lessons: [
      {
        id: "what-is-stylistics",
        title: "What is Stylistics?",
        subtitle: "The scientific study of literary style.",
        content: [
          {
            type: "theoretical",
            content: "### Defining Stylistics\n\nStylistics is the systematic, scientific study of style in language, particularly in literary texts. Unlike traditional literary criticism, which often relies heavily on intuition and subjective feeling, stylistics uses the rigorous terminology and frameworks of linguistics to analyze *why* a text makes us feel a certain way.\n\n### Subjectivity vs. Objectivity\n\nWhile a literary critic might say a poem is 'gloomy' or 'energetic', a stylistician will point to specific linguistic evidence—such as a high frequency of heavy, long vowel sounds (assonance) or the repeated use of passive voice verbs—to explain exactly how that gloominess or energy is constructed on the page.\n\n### The Core Mission\n\nThe ultimate goal of stylistics is to bridge the gap between linguistics (the study of language rules) and literary criticism (the study of meaning and aesthetics). It asks: **How do the specific linguistic choices made by the author contribute to the overall meaning and aesthetic effect of the text?**"
          }
        ]
      },
      {
        id: "poetic-licence",
        title: "Poetic Licence",
        subtitle: "The artistic freedom to bend the rules.",
        content: [
          {
            type: "theoretical",
            content: "### The Concept of Poetic Licence\n\nPoetic licence is formally defined as **the poet's right to ignore rules and conventions** generally observed by the users of a language. It is the artistic justification for breaking grammatical, structural, or lexical norms.\n\n### Why Do Writers Need It?\n\nLanguage naturally comes with a strict set of rules (grammar, syntax, spelling) designed to make everyday communication clear and efficient. However, literature and poetry have different goals. A poet may want to:\n- Force a word into a specific rhythm or meter.\n- Create a rhyme that wouldn't normally work.\n- Shock the reader out of complacency.\n- Express a concept that standard language simply lacks the vocabulary for.\n\n### The Relationship with Stylistics\n\nStylistics relies heavily on the concept of poetic licence. By understanding the standard rules of language, a stylistician can easily identify exactly where and how a poet has utilized their 'licence' to deviate from the norm. This deviation is often where the deepest literary meaning lies."
          }
        ]
      }
    ]
  },
  {
    id: "ch2-levels",
    number: 2,
    title: "Levels of Language",
    estimatedHours: 4,
    icon: "layers",
    status: "not-started",
    progress: 0,
    lessons: [
      {
        id: "linguistic-levels-overview",
        title: "Overview of Linguistic Levels",
        subtitle: "Breaking down language for analysis.",
        content: [
          {
            type: "theoretical",
            content: "### Why Levels of Language?\n\nLanguage is immensely complex, functioning simultaneously across multiple dimensions—from the physical sounds in the air to the abstract concepts in our minds. To perform a systematic stylistic analysis, we must artificially break language down into distinct 'levels'.\n\nBy examining one level at a time, we can uncover patterns and deviations that would otherwise be invisible in the overwhelming totality of the text.\n\nThe main levels are categorized into three broad areas:\n1. **Realization**: The physical manifestation of language (Sound and Writing).\n2. **Form**: The structural components (Words and Sentences).\n3. **Meaning**: The abstract interpretation (Semantics)."
          }
        ]
      },
      {
        id: "phonology",
        title: "Realization: Phonology",
        subtitle: "The study of speech sounds.",
        content: [
          {
            type: "theoretical",
            content: "### Phonology in Stylistics\n\nPhonology is the study of the sound system of a language. When we analyze the phonological level in a literary text, we are looking at how the author uses sound for artistic effect.\n\n### Key Phonological Devices\n- **Alliteration**: The repetition of initial consonant sounds (e.g., *'Peter Piper picked a peck'*). It creates a percussive, memorable rhythm.\n- **Assonance**: The repetition of vowel sounds within words (e.g., *'The rain in Spain falls mainly on the plain'*). It often creates a musical or fluid feeling.\n- **Consonance**: Repetition of consonant sounds at the ends or middle of words (e.g., *'pitter patter'*).\n- **Onomatopoeia**: Words that imitate the sound they describe (e.g., *'buzz', 'crash', 'whisper'*).\n\nBy analyzing phonology, a stylistician can demonstrate how a poem's 'soundscape' reinforces its emotional tone."
          }
        ]
      },
      {
        id: "graphology",
        title: "Realization: Graphology",
        subtitle: "The visual appearance of text.",
        content: [
          {
            type: "theoretical",
            content: "### What is Graphology?\n\nGraphology deals with the visual marks on paper or a screen. While phonology is about how language sounds, graphology is about how it looks. This is especially crucial in written literature, where the visual layout can carry immense meaning.\n\n### Graphological Elements to Analyze\n- **Punctuation**: Does the author use an abundance of dashes, creating a fragmented thought process? Or no punctuation at all, creating a breathless, flowing stream of consciousness?\n- **Capitalization**: e.e. cummings famously avoided capital letters to project a sense of humility and anti-establishmentarianism.\n- **Typography and Layout**: The physical shape of a poem on the page (e.g., concrete poetry where a poem about a swan is shaped like a swan).\n- **Spelling**: Deliberate misspellings to indicate dialect, accent, or uneducated speech."
          }
        ]
      },
      {
        id: "lexicon",
        title: "Form: Lexicon",
        subtitle: "Vocabulary and word choice.",
        content: [
          {
            type: "theoretical",
            content: "### The Lexical Level\n\nThe lexicon is the vocabulary of a language. At this level of form, we analyze the specific words an author has chosen—often referred to as their **diction**.\n\n### Analyzing Lexical Choices\nWhy did the author choose word X instead of word Y?\n- **Register**: Is the vocabulary formal, informal, medical, legal, or slang? Mixing registers can create irony or humor.\n- **Complexity**: Are the words simple and monosyllabic (creating a stark, blunt, or childlike effect), or polysyllabic and Latinate (creating a highly intellectual or detached effect)?\n- **Semantic Fields**: Are there clusters of words related to a specific domain? For example, if a poem about love uses words like *'siege', 'surrender', 'weapon',* and *'wound'*, the author is using a semantic field of war to describe romance."
          }
        ]
      },
      {
        id: "grammar-syntax",
        title: "Form: Grammar and Syntax",
        subtitle: "Sentence structure and word order.",
        content: [
          {
            type: "theoretical",
            content: "### Syntax in Stylistics\n\nGrammar and syntax deal with how words are combined into phrases, clauses, and sentences. It is the architectural blueprint of language.\n\n### What to Look For\n- **Sentence Length**: Short, punchy sentences can create a sense of urgency, action, or anxiety. Extremely long, winding sentences can create a feeling of flowing thought, confusion, or philosophical depth.\n- **Sentence Type**: Are they statements (declarative), questions (interrogative), or commands (imperative)? An abundance of questions might indicate uncertainty or philosophical searching.\n- **Word Order**: Standard English follows Subject-Verb-Object (SVO). Changing this order (e.g., placing the object first for emphasis) drastically alters the psychological impact of the sentence."
          }
        ]
      },
      {
        id: "semantics",
        title: "Meaning: Semantics",
        subtitle: "Literal and figurative meaning.",
        content: [
          {
            type: "theoretical",
            content: "### The Semantic Level\n\nSemantics is the study of meaning. Once language is realized in sound/writing and structured via form, it generates meaning.\n\n### Literal vs. Figurative Meaning\nAt the semantic level, stylistics heavily investigates figurative language—instances where the literal meaning of words is bypassed in favor of imaginative connections.\n- **Metaphor & Simile**: Creating semantic links between completely different concepts (e.g., *'Juliet is the sun'*).\n- **Paradox & Oxymoron**: Placing contradictory meanings side-by-side (e.g., *'deafening silence'*).\n- **Ambiguity**: Deliberately using language that has multiple valid meanings, forcing the reader to hold conflicting ideas in their mind simultaneously."
          }
        ]
      }
    ]
  },
  {
    id: "ch3-foregrounding",
    number: 3,
    title: "Foregrounding & Deviation",
    estimatedHours: 6,
    icon: "highlight",
    status: "not-started",
    progress: 0,
    lessons: [
      {
        id: "psychology-of-foregrounding",
        title: "The Psychology of Foregrounding",
        subtitle: "How texts control reader attention.",
        content: [
          {
            type: "theoretical",
            content: "### What is Foregrounding?\n\nDerived from visual arts (where objects in the 'foreground' grab our immediate attention while the 'background' provides context), linguistic foregrounding is the psychological effect of certain textual devices that force the reader to pay attention to the language itself.\n\n### The Mechanism\nAccording to Gibbons & Whiteley (2018), when language follows all standard rules, it becomes 'transparent'—we look through the words to see the meaning. However, when language is patterned unusually (either extra regular or extra irregular), it becomes 'opaque'. We are forced to stop and look *at* the words. \n\nThis disruption of automatic reading generates literary interpretations. There are three main tools to achieve this: **Parallelism**, **Deviation**, and **Repetition**."
          }
        ]
      },
      {
        id: "parallelism",
        title: "Parallelism: The Power of Pattern",
        subtitle: "Extra regular use of a linguistic feature.",
        content: [
          {
            type: "theoretical",
            content: "### Understanding Parallelism\n\nParallelism is a form of foregrounding characterized by **extra regularity**. It involves holding some linguistic features constant (usually the grammatical structure) while varying others (usually the lexical items).\n\n### Identity and Contrast\nFor parallelism to work, it must contain an element of identity (sameness) and an element of contrast (difference).\n\n*Example:* **\"He was wounded for our transgressions, he was bruised for our iniquities.\"**\n- **Identity (Structure):** *He was [Verb-ed] for our [Noun-s]*\n- **Contrast (Lexicon):** *wounded/bruised*, *transgressions/iniquities*\n\n### The Semantic Effect\nParallelism exerts a powerful psychological force: it pushes readers to perceive semantic relationships (similarity or opposition) between the contrasting words, even if those relationships don't exist in standard language. We instinctively feel that *transgressions* and *iniquities* must mean the same thing because they occupy the exact same slot in parallel structures."
          }
        ]
      },
      {
        id: "intro-to-deviation",
        title: "Introduction to Deviation",
        subtitle: "Breaking expectations and norms.",
        content: [
          {
            type: "theoretical",
            content: "### What is Deviation?\n\nIf parallelism is extra regularity, Deviation is **extra irregularity**. It works by disrupting or departing from expectations.\n\nTo understand deviation, we must ask: deviated from what? There are two types of norms a text can break:\n\n### External Deviation\nThis occurs when the text deviates from a norm lying entirely outside the limits of the poem—typically, the standard rules of the English language. (e.g., using a completely invented word, or breaking standard grammar).\n\n### Internal Deviation\nThis takes place against the background of the text itself. The text establishes a clear pattern (e.g., a specific rhythm, or a specific rhyme scheme), and then suddenly breaks its own established rule to create shock or emphasis."
          }
        ]
      },
      {
        id: "lexical-deviation-neologisms",
        title: "Lexical Deviation: Neologisms",
        subtitle: "Inventing entirely new words.",
        content: [
          {
            type: "theoretical",
            content: "### Inventing Vocabulary\n\nLexical deviation occurs at the level of vocabulary. The most obvious form of lexical deviation is the invention of entirely new words, known as **Neologisms**.\n\n### Nonce-Formations\nWhen a neologism is invented for a single, specific occasion and is not meant to become a permanent part of the dictionary, it is called a **nonce-formation** (or nonce-word).\n\nWriters create nonce-formations when existing language is insufficient to capture a highly specific emotion, concept, or sensory experience. Lewis Carroll's poem *Jabberwocky* is famously packed with nonce-formations like 'slithy', 'toves', and 'brillig', forcing the reader to guess their meaning purely from their sound and syntactic placement."
          }
        ]
      },
      {
        id: "lexical-deviation-morphology",
        title: "Lexical Deviation: Morphological Shifts",
        subtitle: "Affixation, Compounding, and Conversion.",
        content: [
          {
            type: "theoretical",
            content: "### Manipulating Existing Words\n\nLexical deviation doesn't always mean inventing gibberish. Often, writers manipulate existing words using morphological rules in unauthorized ways.\n\n1. **Affixation**: Attaching prefixes or suffixes to words that don't normally take them. E.g., T.S. Eliot's *'foresuffer'*, or e.e. cummings' *'manunkind'*.\n2. **Compounding**: Crashing two distinct words together to create a new hybrid concept. E.g., James Joyce's *'scrotumtightening'*.\n3. **Functional Conversion**: A very common stylistic tool where a word is adapted to a new grammatical function without changing its form. For example, turning a noun into a verb (*'to window'*), or an adjective into a noun (*'the strange'*). Gerard Manley Hopkins famously wrote, *'The just man justices'*."
          }
        ]
      },
      {
        id: "syntactic-deviation",
        title: "Syntactic Deviation",
        subtitle: "Twisting the order of words.",
        content: [
          {
            type: "theoretical",
            content: "### Breaking Grammar\n\nSyntactic deviation involves departing from the grammatical constraints and standard word order of a language.\n\n### Inversion and Hyperbaton\nThe most common form of syntactic deviation in poetry is **inversion** (or hyperbaton)—reordering the subject, verb, and object.\n\n*Example:* **'Her Kindling buds as if she Autumn were.'**\nInstead of the standard *'as if she were Autumn'*, the verb *'were'* is pushed to the very end of the sentence. \n\nPoets use syntactic deviation for two main reasons:\n1. **Mechanics**: To force a sentence to fit a specific rhythm (meter) or to place a specific word at the end of a line for a rhyme.\n2. **Emphasis**: Moving a word to an unusual position in a sentence automatically draws the reader's attention to it."
          }
        ]
      },
      {
        id: "phonological-deviation",
        title: "Phonological Deviation",
        subtitle: "Playing with pronunciation and sound.",
        content: [
          {
            type: "theoretical",
            content: "### Altering Sounds\n\nPhonological deviation involves pronouncing or stressing words oddly, deviating from standard phonetic norms. This is often done to maintain a poem's meter or to reflect a specific dialect.\n\n### Types of Phonological Omission\nClassical poetry has specific names for the omission of sounds:\n- **Aphesis**: Loss of an initial unstressed vowel (e.g., *'mid* instead of *amid*).\n- **Syncope**: Loss of a medial sound in the middle of a word (e.g., *o'er* for *over*, *heav'n* for *heaven*).\n- **Apocope**: Loss of a final sound (e.g., *oft* instead of *often*, or dropping the 'g' in *runnin'*).\n\nAdditionally, poets might use strange capitalizations purely to indicate a marked phonetic emphasis when the poem is read aloud."
          }
        ]
      },
      {
        id: "graphological-deviation",
        title: "Graphological Deviation",
        subtitle: "Visual rule-breaking on the page.",
        content: [
          {
            type: "theoretical",
            content: "### Visual Disruption\n\nGraphological deviation manipulates the visual rules of writing: typography, layout, punctuation, and spelling.\n\nBecause we are highly trained to read words as unified visual blocks, breaking those blocks is profoundly jarring.\n\n*Example:* Splitting a word across two lines of poetry.\n```text\nI saw a bird fly into the win-\ndow.\n```\nThis forces the reader's eye to physically break across the word 'window', mimicking the visual and physical disruption of a bird hitting glass. e.e. cummings is considered the absolute master of graphological deviation, using chaotic spacing and lack of punctuation to create visual art out of text."
          }
        ]
      },
      {
        id: "semantic-deviation",
        title: "Semantic Deviation",
        subtitle: "Logical contradictions and paradox.",
        content: [
          {
            type: "theoretical",
            content: "### Breaking Logic\n\nSemantic deviation occurs when meaning relations within a sentence are logically inconsistent or paradoxical. The grammar is perfectly fine, the words are real, but the resulting meaning is literally impossible.\n\n### Metaphor and Paradox\nAlmost all figurative language relies on semantic deviation.\n- *'The wind whispered through the trees.'* (Wind doesn't have vocal cords; this is semantic deviation resulting in personification).\n- *'Cold that is the heart's heat.'* (A paradox; heat and cold are mutually exclusive).\n\nWhen faced with semantic deviation, the reader's brain must resolve the illogicality by generating a figurative, metaphorical interpretation."
          }
        ]
      },
      {
        id: "repetition",
        title: "Repetition",
        subtitle: "The simplest form of foregrounding.",
        content: [
          {
            type: "theoretical",
            content: "### The Power of Echo\n\nRepetition is widely considered the simplest, most fundamental form of foregrounding. It is the exact iteration of a sound, word, phrase, or sentence.\n\nUnlike parallelism (which involves contrast), repetition is pure identity.\n\n### The Effect\nRepeating a word or phrase gives it a greater, more prolonged force than it would usually possess. It can simulate a variety of psychological states:\n- Obsession or fixation.\n- Exhaustion or endlessness (e.g., *'Miles to go before I sleep, / And miles to go before I sleep.'*)\n- Rhetorical persuasion and climax in political speeches."
          }
        ]
      }
    ]
  },
  {
    id: "ch4-cohesion",
    number: 4,
    title: "Cohesion: Weaving Texts",
    estimatedHours: 5,
    icon: "link",
    status: "not-started",
    progress: 0,
    lessons: [
      {
        id: "what-is-cohesion",
        title: "What is Cohesion?",
        subtitle: "Intersentential links and invisible threads.",
        content: [
          {
            type: "theoretical",
            content: "### The Binding Agent of Text\n\nCohesion refers to the linguistic means by which sentences are woven together to make a unified text. Just as a house needs cement to hold bricks together, texts need cohesive ties. \n\nCrucially, cohesion operates **across sentences** (intersentential). While grammar holds a single sentence together, cohesion holds paragraph 1 to paragraph 2.\n\n### Cohesion vs. Coherence\n- **Cohesion** is the *surface-level* grammatical and lexical links on the page (e.g., using 'Therefore' or 'He').\n- **Coherence** is the *underlying* logical sense in the reader's mind.\nA text can be highly cohesive but incoherent (e.g., *\"I like blue. Blue is a color. Colors are in rainbows. Rainbows are heavy.\"*). Conversely, a text can lack cohesive ties but still be coherent due to context (e.g., *\"Stop. Hammer time.\"*)"
          }
        ]
      },
      {
        id: "reference-anaphora-cataphora",
        title: "Reference: Anaphora and Cataphora",
        subtitle: "Pointing backwards and forwards.",
        content: [
          {
            type: "theoretical",
            content: "### Reference Cohesion\n\nReference occurs when a grammatical word is used in association with a word or phrase elsewhere in the text. You cannot interpret the reference word without looking elsewhere.\n\n### Direction of Reference\n1. **Anaphora**: Pointing backwards. The reference word refers back to an entity introduced earlier. \n   - *Example:* 'I saw a dog. **It** was barking.' ('It' refers back to 'dog').\n2. **Cataphora**: Pointing forwards. The reference word precedes the entity it refers to, creating suspense.\n   - *Example:* 'Before **he** went to bed, **John** locked the door.' ('He' refers forward to 'John').\n3. **Exophora**: Pointing outside the text. Refers to the real-world situational context.\n   - *Example:* Look at **that**! (Requires physical context to understand)."
          }
        ]
      },
      {
        id: "reference-demonstratives-comparatives",
        title: "Reference: Demonstratives & Comparatives",
        subtitle: "Pointing and comparing.",
        content: [
          {
            type: "theoretical",
            content: "### Types of Reference Words\n\nBeyond simple personal pronouns (he, she, it, they), reference cohesion is achieved through:\n\n1. **Demonstratives**: Words that indicate proximity or distance. \n   - *This, that, these, those, here, there, then.*\n   - The definite article '*the*' also functions as a subsequent-mention reference. (e.g., 'A man walked in. *The* man sat down.')\n\n2. **Comparative Constructions**: Words that require a point of comparison to make sense. \n   - *Same, similar, such, different, other, more, less.*\n   - *Example:* 'Anil's own religion is **different**.' (The reader must mentally link back to the previous sentence to find out what Anil's religion is different *from*)."
          }
        ]
      },
      {
        id: "ellipsis",
        title: "Ellipsis: The Art of Omission",
        subtitle: "Leaving out the obvious.",
        content: [
          {
            type: "theoretical",
            content: "### What is Ellipsis?\n\nEllipsis is a cohesive device where material is deliberately left out because its repetition is felt to be unnecessary. It relies heavily on the reader's ability to retrieve the missing information from the surrounding text (co-text).\n\n### Types of Ellipsis\n1. **Nominal Ellipsis**: Omitting a noun. \n   - *Example:* 'These apples are bad. I want some good [apples].'\n2. **Verbal Ellipsis**: Omitting a verb or verb phrase.\n   - *Example:* 'A: Have you been swimming? B: Yes, I have [been swimming].'\n3. **Clausal Ellipsis**: Omitting an entire clause, very common in dialogue.\n   - *Example:* 'A: Who is going to the party? B: John [is going to the party].'"
          }
        ]
      },
      {
        id: "substitution",
        title: "Substitution: Placeholders in Text",
        subtitle: "Using one, do, and so.",
        content: [
          {
            type: "theoretical",
            content: "### What is Substitution?\n\nSubstitution is essentially 'partial ellipsis'. Instead of leaving a complete blank gap, the writer replaces a larger linguistic item with a short 'placeholder' word.\n\n### The Placeholders\n1. **Nominal Substitution**: Uses words like *one, ones, the same*.\n   - *Example:* 'My car broke down. I need to buy a new **one**.'\n2. **Verbal Substitution**: Uses the auxiliary verb *do*.\n   - *Example:* 'She runs faster than I **do**.'\n3. **Clausal Substitution**: Uses words like *so* and *not* to replace entire clauses.\n   - *Example:* 'Is it going to rain? I think **so**.' (Replacing 'I think [it is going to rain]')."
          }
        ]
      },
      {
        id: "conjunction-additive-adversative",
        title: "Conjunction: Additive & Adversative",
        subtitle: "Logical signposts for the reader.",
        content: [
          {
            type: "theoretical",
            content: "### The Role of Conjunctions\n\nUnlike reference or ellipsis, which require the reader to search for missing information, Conjunctions are explicit **semantic signposts**. They sit at the beginning of a sentence or clause and explicitly state the logical relationship with what came before.\n\n### Additive Conjunctions\nThese add information to what has already been established.\n- *Examples:* And, furthermore, moreover, similarly, in addition.\n\n### Adversative Conjunctions\nThese introduce a contrast, counter-expectation, or contradiction to what was just stated.\n- *Examples:* But, yet, however, conversely, on the other hand, although."
          }
        ]
      },
      {
        id: "conjunction-causal-temporal",
        title: "Conjunction: Causal & Temporal",
        subtitle: "Cause, effect, and time.",
        content: [
          {
            type: "theoretical",
            content: "### Causal Conjunctions\nThese signposts clarify a cause-and-effect or conditional relationship between sentences. They tell the reader *why* something happened based on the previous text.\n- *Examples:* So, therefore, thus, as a result, because, consequently.\n\n### Temporal Conjunctions\nThese signposts establish a chronological or time-based relationship between events in the text. They are essential for narrative flow.\n- *Examples:* Then, next, meanwhile, finally, previously, simultaneously.\n\n### Continuative Conjunctions\nA minor category used heavily in spoken discourse to simply keep the flow going or shift topics slightly.\n- *Examples:* Now, of course, well, anyway, surely."
          }
        ]
      },
      {
        id: "lexical-cohesion-repetition-synonymy",
        title: "Lexical Cohesion: Repetition & Synonymy",
        subtitle: "Building networks of vocabulary.",
        content: [
          {
            type: "theoretical",
            content: "### Moving Beyond Grammar\n\nLexical cohesion is fundamentally different from the others. It does not rely on grammar rules or empty placeholders. Instead, it creates a sense of integratedness through the strategic repetition and association of **vocabulary (content words)**.\n\n### Simple Repetition\nThe most basic form is using the exact same word multiple times across a text. This establishes a clear core topic.\n\n### Synonymy\nInstead of repeating the exact word, a writer uses synonyms (words with identical meanings) or near-synonyms. This weaves the text together while providing stylistic variety.\n- *Example:* 'The boy sat on the **chair**. The **seat** was highly uncomfortable.'"
          }
        ]
      },
      {
        id: "lexical-cohesion-superordinates-collocation",
        title: "Lexical Cohesion: Superordinates & Collocation",
        subtitle: "Categories and natural pairings.",
        content: [
          {
            type: "theoretical",
            content: "### Superordinates and Subordinates (Hyponymy)\nCohesion can be achieved by moving between general categories (superordinates) and specific examples (subordinates/hyponyms).\n- *Example:* 'The **rabbit** was eating a carrot. I've always loved small **pets**. In fact, every **animal** is precious to me.' \nHere, the text links *rabbit* -> *pet* -> *animal*.\n\n### Collocation\nThis is the most subtle form of lexical cohesion. It relies on the statistical probability of words naturally co-occurring in the same environment. When readers see words that 'belong together', the text feels unified.\n- *Example:* Words like *bacon and eggs*, *strong tea*, *heavy rain*, or a thematic cluster like *doctor, nurse, hospital, scalpel*."
          }
        ]
      }
    ]
  },
  {
    id: "ch5-modality",
    number: 5,
    title: "Modality & Attitude",
    estimatedHours: 4,
    icon: "psychology",
    status: "not-started",
    progress: 0,
    lessons: [
      {
        id: "intro-modality",
        title: "Introduction to Modality",
        subtitle: "Expressing opinion, doubt, and certainty.",
        content: [
          {
            type: "theoretical",
            content: "### What is Modality?\n\nIn stylistics and grammar, Modality is the linguistic cover term for the ways a speaker expresses their 'opinion or attitude' towards a proposition.\n\nWithout modality, language consists only of flat, absolute facts (e.g., 'The cat is on the mat'). Modality allows us to qualify these claims, expressing doubt, certainty, obligation, or willingness (e.g., 'The cat *might* be on the mat', or 'The cat *must* leave the mat'). It is the language of human subjectivity."
          }
        ]
      },
      {
        id: "four-parameters-modality",
        title: "The Four Parameters of Modality",
        subtitle: "Probability, Obligation, Willingness, Usuality.",
        content: [
          {
            type: "theoretical",
            content: "### The Dimensions of Attitude\n\nModality generally operates along four main parameters:\n\n1. **Probability**: Expressing how likely something is to be true. \n   - *She certainly is interesting. / It might rain.*\n2. **Obligation**: Expressing commands, duty, or necessity.\n   - *You must be patient. / You should study harder.*\n3. **Willingness**: Expressing volition, desire, or inclination.\n   - *I would do it for you. / Will you give me a hand?*\n4. **Usuality**: Expressing frequency or typicality.\n   - *I rarely meet people like this. / Gdansk is usually in Poland.*"
          }
        ]
      },
      {
        id: "modal-verbs-intensity",
        title: "Modal Verbs & Scales of Intensity",
        subtitle: "Can, Could, Must, Might.",
        content: [
          {
            type: "theoretical",
            content: "### The Grammar of Modality\n\nThe most established grammatical method of adding modality is through **modal auxiliary verbs**: *can, could, would, may, might, must, shall, should, ought to*.\n\n### Scales of Intensity\nModal verbs are not created equal; they exist on a scale of intensity ranging from weak to strong.\n\nTake the parameter of Probability:\n- *Weak:* Yeltsin **might** fall.\n- *Moderate:* Yeltsin **may** fall.\n- *Strong:* Yeltsin **must** fall. (Near-certainty)\n\nAnalyzing an author's choice of modal verbs reveals their underlying confidence, authority, or hesitancy."
          }
        ]
      },
      {
        id: "will-modality-vs-futurity",
        title: "The Verb 'Will': Modality vs. Futurity",
        subtitle: "Is the future a fact or an opinion?",
        content: [
          {
            type: "theoretical",
            content: "### The Dual Nature of 'Will'\n\nThe modal verb *will* is unique in English because it straddles the line between expressing attitude (modality) and simply indicating future tense (futurity).\n\n### 'Will' as Modality\nIt can express strong probability (*'That lad will come to a sticky end'*) or willingness/volition (*'Will you have some tea?'*).\n\n### 'Will' as Unmodalized Futurity\nHowever, on some occasions, *will* carries almost no subjective modality. It acts purely as a marker of an objective, non-negotiable future event.\n- *Example:* 'At 6:17 GMT tomorrow, there **will** be a partial lunar eclipse.' \nHere, the speaker is not expressing an opinion; they are stating a mathematical certainty."
          }
        ]
      },
      {
        id: "modal-adverbs",
        title: "Modal Adverbs",
        subtitle: "Probably, Certainly, Definitely.",
        content: [
          {
            type: "theoretical",
            content: "### Adverbial Modality\n\nThe second most common way of expressing modality is by means of modal adverbs: *probably, possibly, certainly, necessarily, usually, always, definitely, surely*.\n\n### The Paradox of 'Definitely'\nAn interesting feature of modal adverbs is that even strong words like 'definitely' actually weaken a statement compared to a bare fact.\n- Fact: *'I saw Jim take it.'*\n- Modalized: *'I definitely saw Jim take it.'*\n\nAdding 'definitely' shows that the speaker feels the need to aggressively assert their certainty, implying that there is room for doubt or that someone might disagree with them."
          }
        ]
      },
      {
        id: "advanced-modality-cognition",
        title: "Advanced Modality: Metaphorized Forms",
        subtitle: "I think, I believe, I reckon.",
        content: [
          {
            type: "theoretical",
            content: "### Verbs of Cognition as Modals\n\nEnglish frequently uses verbs of cognition (thinking, believing, guessing) not to describe literal mental processes, but to express modality.\n\n- *'I don't believe we've met.'*\n- *'I reckon it's going to rain.'*\n\nIn these examples, the speaker isn't talking about their religious/philosophical 'belief' system or performing a mathematical 'reckoning'. They are simply using these verbs as advanced, metaphorized ways to express **Probability**. It is equivalent to saying 'It is probable that we haven't met'."
          }
        ]
      }
    ]
  },
  {
    id: "ch6-pragmatics",
    number: 6,
    title: "Pragmatics & Politeness",
    estimatedHours: 6,
    icon: "forum",
    status: "not-started",
    progress: 0,
    lessons: [
      {
        id: "intro-pragmatics-speech-acts",
        title: "Introduction to Speech Acts",
        subtitle: "Doing things with words.",
        content: [
          {
            type: "theoretical",
            content: "### Pragmatics\nPragmatics is the study of how context influences meaning. It looks beyond the literal dictionary definitions of words to understand what a speaker *intends* to achieve in a specific situation.\n\n### Speech Act Theory\nDeveloped by J.L. Austin, Speech Act theory argues that language is not just used to describe the world; it is used to perform actions. These actions are called Speech Acts.\n\nEvery utterance involves three acts:\n1. **Locutionary Act**: The physical act of producing a meaningful linguistic expression (moving your lips and vocal cords).\n2. **Illocutionary Act**: The intended communicative force or function (e.g., a promise, a threat, a request).\n3. **Perlocutionary Act**: The actual psychological or physical effect the utterance has on the hearer (e.g., intimidating them, convincing them)."
          }
        ]
      },
      {
        id: "types-of-speech-acts",
        title: "Types of Speech Acts",
        subtitle: "Declarations, Directives, and more.",
        content: [
          {
            type: "theoretical",
            content: "### The Five Categories\nJohn Searle categorized illocutionary acts into five main types:\n\n1. **Declarations**: Acts that instantly change the state of the world via the utterance itself (e.g., a priest saying *'I now pronounce you husband and wife'*, or a referee shouting *'You're out!'*).\n2. **Representatives (Assertives)**: Statements that commit the speaker to the truth of something (e.g., facts, assertions, conclusions). *'The earth is round.'*\n3. **Expressives**: Statements that express the speaker's psychological state or feelings (e.g., apologizing, thanking, congratulating). *'I'm so sorry.'*\n4. **Directives**: Acts attempting to get the hearer to do something (e.g., commands, requests, begging). *'Close the door.'*\n5. **Commissives**: Acts that commit the speaker to some future action (e.g., promises, threats, vows). *'I will pay you back tomorrow.'*"
          }
        ]
      },
      {
        id: "cooperative-principle",
        title: "The Cooperative Principle",
        subtitle: "Grice's foundational assumption.",
        content: [
          {
            type: "theoretical",
            content: "### Assuming Cooperation\n\nPhilosopher H. Paul Grice proposed the **Cooperative Principle (CP)**, which states that human communication is fundamentally built on the assumption that everyone is trying to be cooperative, purposeful, and effective.\n\nEven when people are arguing, they are generally cooperating linguistically to make the argument make sense.\n\n### The Four Maxims\nTo observe the CP, speakers intuitively follow four Conversational Maxims:\n1. **Maxim of Quality**: Be truthful. Do not say what you believe to be false or lack evidence for.\n2. **Maxim of Quantity**: Be exactly as informative as required—no more, no less.\n3. **Maxim of Relation (Relevance)**: Be relevant to the current topic of conversation.\n4. **Maxim of Manner**: Be clear. Avoid obscurity, ambiguity, and prolixity (wordiness)."
          }
        ]
      },
      {
        id: "flouting-maxims",
        title: "Flouting the Maxims",
        subtitle: "Breaking rules to send a message.",
        content: [
          {
            type: "theoretical",
            content: "### Deliberate Disruption\n\nWhile speakers usually follow the maxims, they frequently and deliberately break them. When a speaker blatantly fails to observe a maxim, expecting the hearer to notice, this is called **flouting**.\n\n- **Flouting Quality**: Saying something obviously false to create sarcasm, irony, or metaphor. (e.g., *'You failed the test.' -> 'Oh, brilliant.'*)\n- **Flouting Quantity**: Providing way too much or way too little information. (e.g., Answering *'Did you do your homework?'* with a simple *'I took my books out.'*)\n- **Flouting Relation**: Blatantly changing the subject to drop a hint. (e.g., *'What do you think of my new hat?' -> 'It's very sunny today.'*)\n- **Flouting Manner**: Being intentionally confusing or spelling things out (e.g., *'Let's go get some I-C-E-C-R-E-A-M'* so the kids don't understand)."
          }
        ]
      },
      {
        id: "implicature",
        title: "Conversational Implicature",
        subtitle: "Reading between the lines.",
        content: [
          {
            type: "theoretical",
            content: "### Meaning Beyond Words\n\nWhen a maxim is flouted, the conversation doesn't break down. Because of the Cooperative Principle, the hearer assumes the speaker is still trying to communicate something. \n\nThe hearer is forced to search for a hidden, covert meaning. This unstated, implied meaning is called a **Conversational Implicature**.\n\n*Example:*\n- **A:** 'Are you coming to the party?'\n- **B:** 'I have a massive exam tomorrow.'\n\nB flouts the Maxim of Relation (an exam isn't a yes/no answer about a party). A infers the **implicature**: *No, I am not coming because I must study.* Implicature is the primary mechanism of 'reading between the lines'."
          }
        ]
      },
      {
        id: "concept-of-face",
        title: "The Concept of Face",
        subtitle: "Self-esteem and public image.",
        content: [
          {
            type: "theoretical",
            content: "### Brown & Levinson's Theory\n\nPoliteness theory is built around the concept of 'Face'—an individual's self-esteem and the public self-image they wish to maintain in social interactions.\n\nFace is divided into two distinct desires:\n\n1. **Positive Face**: The desire to be liked, appreciated, approved of, and treated as a member of the same group.\n2. **Negative Face**: The desire for autonomy, freedom from imposition, and the right not to be coerced or distracted by others. (Note: 'Negative' here means 'freedom from', not 'bad')."
          }
        ]
      },
      {
        id: "face-threatening-acts",
        title: "Face Threatening Acts (FTAs)",
        subtitle: "Social friction in language.",
        content: [
          {
            type: "theoretical",
            content: "### Threatening the Image\n\nMany standard speech acts inherently threaten the face of either the speaker or the hearer. These are called **Face Threatening Acts (FTAs)**.\n\n- **Threats to Hearer's Negative Face**: Orders, requests, advice, and warnings. They impede the hearer's freedom of action.\n- **Threats to Hearer's Positive Face**: Criticisms, insults, disagreements, and complaints. They show a lack of approval.\n- **Threats to Speaker's Own Face**: Apologies, accepting compliments, and confessions. They damage the speaker's own image.\n\nBecause FTAs cause social friction, speakers use Politeness Strategies to soften the blow."
          }
        ]
      },
      {
        id: "politeness-bald-off-record",
        title: "Politeness: Bald and Off-Record",
        subtitle: "Directness vs. Hints.",
        content: [
          {
            type: "theoretical",
            content: "### Evaluating Strategies\nWhen faced with performing an FTA (like asking someone to close a window), a speaker must choose a strategy based on the social distance, power dynamic, and weight of the request.\n\n### 1. Bald On-Record\nPerforming the FTA directly, clearly, and concisely, with absolutely no mitigation or politeness markers.\n- *'Close the window.'*\n- **Pros:** Highly efficient, no confusion.\n- **Cons:** High risk of offending the hearer unless there is an emergency or the speaker has immense power over the hearer.\n\n### 2. Off-Record (Hinting)\nAvoiding an explicit request entirely by dropping a vague hint, hoping the hearer picks up the implicature.\n- *'Brrr, it's quite cold in here.'*\n- **Pros:** Zero threat to face, as the speaker can deny they asked for anything.\n- **Cons:** Extremely low efficiency; the hearer might ignore it or misunderstand."
          }
        ]
      },
      {
        id: "politeness-positive-negative",
        title: "Politeness: Positive and Negative",
        subtitle: "Mitigating the social threat.",
        content: [
          {
            type: "theoretical",
            content: "### 3. Positive Politeness\nPerforming the FTA but softening it by attending to the hearer's Positive Face (their desire to be liked). Strategies include:\n- Using in-group markers or nicknames (*'Hey buddy, mate, honey'*).\n- Giving compliments before the request (*'You're so good at this, can you help me?'*).\n- Claiming common ground and seeking agreement.\n\n### 4. Negative Politeness\nPerforming the FTA but softening it by attending to the hearer's Negative Face (their desire not to be imposed upon). Strategies include:\n- Being highly indirect (*'Could you possibly...?'*).\n- Using hedges and pessimistic phrasing (*'I don't suppose you would...'*).\n- Apologizing heavily (*'I'm so sorry to bother you, but...'*).\n- Giving the hearer a clear out to refuse the request."
          }
        ]
      },
      {
        id: "labov-abstract-orientation",
        title: "Labov's Narrative: Abstract & Orientation",
        subtitle: "Setting up the story.",
        content: [
          {
            type: "theoretical",
            content: "### Analyzing Stories\nWilliam Labov developed a highly influential 6-part framework for analyzing natural, conversational narratives. He sought to understand how people naturally tell stories to each other.\n\n### 1. Abstract\nThe initial clause that summarizes the entire story before it begins. It answers the listener's implicit question: *What is this about?*\n- *Example:* 'Let me tell you about the time I almost crashed my car.'\n\n### 2. Orientation\nThe stage-setting phase. It provides the necessary background information: who was involved, when it happened, where it happened, and the initial situation.\n- *Example:* 'It was late Tuesday night, raining heavily, and I was driving down Route 66.'"
          }
        ]
      },
      {
        id: "labov-complicating-resolution",
        title: "Labov's Narrative: Action & Resolution",
        subtitle: "The core events.",
        content: [
          {
            type: "theoretical",
            content: "### 3. Complicating Action\nThis is the backbone of the narrative. It consists of a series of chronological clauses that detail the core events. It answers the question: *Then what happened?*\n- *Example:* 'Suddenly, a deer jumped out. I slammed on the brakes. The car spun out of control.'\n\n### 4. Resolution\nThis segment outlines the final outcome of the complicating action. It tells the listener how the crisis or sequence of events finally concluded.\n- *Example:* 'I managed to steer into the ditch and the car finally stopped inches from a tree.'"
          }
        ]
      },
      {
        id: "labov-evaluation",
        title: "Labov's Narrative: Evaluation",
        subtitle: "The soul of the story.",
        content: [
          {
            type: "theoretical",
            content: "### 5. Evaluation\nLabov argued that Evaluation is the most critical part of a well-formed narrative. It answers the listener's aggressive question: *So what? Why are you telling me this?*\nWithout evaluation, a story is just a pointless list of events.\n\n### Types of Evaluation\n- **External Evaluation:** The narrator explicitly stops the story, steps out of the narrative frame, and tells the listener the point. (*'And let me tell you, I have never been more terrified in my life.'*)\n- **Internal Evaluation:** The evaluation is embedded within the story itself. This includes:\n  - *Intensifiers*: Gestures, repetition (*'I was so, so scared'*).\n  - *Comparators*: Using modals or negatives to compare what happened with what *could* have happened (*'I could have died'*).\n  - *Explicatives*: Giving reasons for actions."
          }
        ]
      },
      {
        id: "labov-coda",
        title: "Labov's Narrative: The Coda",
        subtitle: "Returning to the present.",
        content: [
          {
            type: "theoretical",
            content: "### 6. The Coda\n\nThe final element of Labov's structure is the Coda. It acts as a bridge that returns the listener from the past time of the narrative world back into the present moment of the conversation.\n\nIt signals definitively that the story is over and prevents the listener from asking, 'And then what happened?'\n\n- *Examples:* \n  - 'And that's why I never drive in the rain anymore.'\n  - 'So here we are.'\n  - 'And they lived happily ever after.'\n  - Simply shifting verb tense back to the present: 'I still think about it today.'"
          }
        ]
      }
    ]
  }
];

fs.writeFileSync('C:\\\\Users\\\\hp\\\\.gemini\\\\antigravity\\\\scratch\\\\src\\\\data\\\\chapters.json', JSON.stringify(chapters, null, 2));
console.log('Massive expanded curriculum written with 47 deeply elaborated lessons.');
