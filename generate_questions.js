const fs = require('fs');

const questions = [];

// Helper to add questions
const addQ = (ch, type, text, options, correct, expl) => {
  questions.push({
    id: `q_${ch}_${questions.length + 1}`,
    chapterId: ch,
    type: type,
    text: text,
    options: options,
    correctAnswer: correct,
    explanation: expl
  });
};

// ================= CHAPTER 1 (20 Qs) =================
// Theory (10)
addQ('ch1', 'theoretical', 'What defines Poetic Licence?', ['The poet\'s right to ignore rules and conventions', 'Strict adherence to grammatical norms', 'The use of archaic words only', 'Writing without punctuation'], 0, 'Poetic licence is the right to ignore rules and conventions generally observed by users of the language.');
addQ('ch1', 'theoretical', 'Which level of language deals with sounds?', ['Phonology', 'Graphology', 'Semantics', 'Lexicon'], 0, 'Phonology deals with the realization of sounds.');
addQ('ch1', 'theoretical', 'What is Foregrounding?', ['Making certain aspects of a text prominent', 'Hiding the main meaning of a text', 'Using only literal language', 'Ignoring context'], 0, 'Foregrounding refers to ways in which certain aspects of a text are made to stand out.');
addQ('ch1', 'theoretical', 'What distinguishes Parallelism from mechanical repetition?', ['An element of identity and contrast', 'It uses different words', 'It only occurs in poetry', 'It has no meaning'], 0, 'Parallelism must have an element of identity and an element of contrast.');
addQ('ch1', 'theoretical', 'What is External Deviation?', ['Deviation against a norm outside the poem', 'Deviation within the poem itself', 'A typo by the author', 'Changing the font size'], 0, 'External deviation is explicated against some norm outside the limits of the poem.');
addQ('ch1', 'theoretical', 'Which is an example of Lexical Deviation?', ['Neologism', 'Metaphor', 'Rhyme', 'Alliteration'], 0, 'Lexical deviation is achieved through inventing new words (neologism).');
addQ('ch1', 'theoretical', 'What type of deviation involves altering sentence structure?', ['Syntactic deviation', 'Semantic deviation', 'Phonological deviation', 'Graphological deviation'], 0, 'Syntactic deviation involves deviating from normal S-V-O-A order.');
addQ('ch1', 'theoretical', 'What does Semantic Deviation emerge from?', ['Meaning relations which are logically inconsistent', 'Spelling errors', 'Odd pronunciations', 'Missing punctuation'], 0, 'Semantic deviation emerges from logically inconsistent meaning relations like metaphors.');
addQ('ch1', 'theoretical', 'What is Internal Deviation?', ['Deviation against the background of the poem', 'Deviation against societal norms', 'A spelling mistake', 'Using foreign languages'], 0, 'Internal deviation takes place against the background pattern established by the text itself.');
addQ('ch1', 'theoretical', 'What is the purpose of Repetition in stylistics?', ['To emphasize or prolong force', 'To bore the reader', 'To save vocabulary', 'To hide the meaning'], 0, 'Repetition emphasizes severity or prolonged force.');
// Applied (10)
addQ('ch1', 'applied', 'Read: "Where wealth accumulates and men decay." What device is primarily used here?', ['Parallelism', 'Neologism', 'Epistrophe', 'Onomatopoeia'], 0, 'The structure is parallel but contrasts "accumulates" with "decay".');
addQ('ch1', 'applied', 'Read: "He foresuffered all." The word "foresuffered" is an example of:', ['Lexical deviation (Affixation)', 'Syntactic deviation', 'Graphological deviation', 'Semantic deviation'], 0, 'Adding the prefix "fore-" to "suffer" is lexical deviation via affixation.');
addQ('ch1', 'applied', 'Read: "The widow-making unchilding unfathering deeps." This uses:', ['Compounding and Affixation', 'Only syntactic deviation', 'Only semantic deviation', 'No deviation'], 0, 'It uses neologisms formed by compounding and affixation.');
addQ('ch1', 'applied', 'Read: "The just man justices." What device is this?', ['Functional conversion', 'Graphological deviation', 'Metaphor', 'Simile'], 0, 'Converting the adjective/noun "justice" into a verb is functional conversion.');
addQ('ch1', 'applied', 'Read: "He danced his did." This is an example of:', ['Syntactic deviation', 'Perfect grammar', 'Lexical deviation', 'Phonological deviation'], 0, 'Using "did" as a noun is a syntactic deviation from normal word classes.');
addQ('ch1', 'applied', 'Read: "O wind, rend open the heat..." The odd spacing or line breaks here would be:', ['Graphological deviation', 'Phonological deviation', 'Semantic deviation', 'Lexical deviation'], 0, 'Layout and typography issues fall under graphological deviation.');
addQ('ch1', 'applied', 'Read: "The silence was deafening." This represents:', ['Semantic deviation (Paradox)', 'Syntactic deviation', 'Graphological deviation', 'Phonological elision'], 0, 'Silence cannot be deafening; this is a logical inconsistency or paradox.');
addQ('ch1', 'applied', 'Read: "I caught this morning morning\'s minion." The repetition of sounds is:', ['Phonological patterning', 'Lexical deviation', 'Semantic deviation', 'Syntactic deviation'], 0, 'The alliteration and assonance create a phonological pattern.');
addQ('ch1', 'applied', 'Read: "He is a pig." In stylistics, this is:', ['Semantic deviation (Metaphor)', 'Literal truth', 'Syntactic deviation', 'Graphological deviation'], 0, 'Applying animal traits to a human is a semantic deviation (metaphor).');
addQ('ch1', 'applied', 'Read: "Alone, alone, all, all alone." The primary stylistic effect is:', ['Repetition for emphasis', 'Neologism', 'Syntactic inversion', 'Functional conversion'], 0, 'The repetition emphasizes the extreme isolation.');


// ================= CHAPTER 2 (20 Qs) =================
// Theory (10)
addQ('ch2', 'theoretical', 'What is Cohesion?', ['The linguistic means by which sentences are woven together to make texts', 'The study of sounds', 'The invention of new words', 'The grammatical rules of a language'], 0, 'Cohesion refers to how sentences are bound together and cross-linked.');
addQ('ch2', 'theoretical', 'Which of the following is NOT a type of cohesion?', ['Phonological elision', 'Reference', 'Ellipsis', 'Conjunction'], 0, 'Phonological elision is a type of deviation, not a cohesion mechanism.');
addQ('ch2', 'theoretical', 'What does Reference in cohesion involve?', ['Using a grammatical word to associate with a word in a separate sentence', 'Leaving material out entirely', 'Repeating the exact same word', 'Using coordinating conjunctions'], 0, 'Reference uses pronouns or comparatives to refer to other parts of the text.');
addQ('ch2', 'theoretical', 'What is Partial Ellipsis?', ['Using an abridged structure to stand in for a full sequence', 'Omitting all words in a sentence', 'Using synonyms', 'Adding unnecessary words'], 0, 'Partial ellipsis condenses structures using words like "one", "do", etc.');
addQ('ch2', 'theoretical', 'Which words are typical of Conjunction in cohesion?', ['However, therefore, moreover', 'He, she, it', 'The, a, an', 'Dog, cat, mouse'], 0, 'Conjunction uses words that clarify logical relationships between sentences.');
addQ('ch2', 'theoretical', 'What is Lexical Cohesion?', ['Recurrent uses of the same or related content words', 'Using pronouns', 'Omitting words', 'Using transition words'], 0, 'Lexical cohesion involves repetition, synonyms, or collocations.');
addQ('ch2', 'theoretical', 'What is Collocation?', ['The tendency of certain words to co-occur', 'The use of opposite words', 'The omission of verbs', 'The study of prefixes'], 0, 'Collocation is a type of lexical cohesion where words frequently appear together.');
addQ('ch2', 'theoretical', 'Which is an example of a superordinate term?', ['Animal (for dog)', 'Bark (for dog)', 'Puppy (for dog)', 'Collar (for dog)'], 0, 'A superordinate term is a broader category that includes the specific item.');
addQ('ch2', 'theoretical', 'What is Full Ellipsis?', ['Full omission of a second mention of items', 'Repeating the full sentence', 'Replacing a noun with a pronoun', 'Using a synonym'], 0, 'Full ellipsis completely omits words that are understood from context.');
addQ('ch2', 'theoretical', 'What type of conjunction is "Furthermore"?', ['Additive', 'Adversative', 'Causal', 'Temporal'], 0, 'Furthermore adds information, making it an additive conjunction.');
// Applied (10)
addQ('ch2', 'applied', 'Read: "John bought a car. He loves it." What cohesion type links "John" and "He"?', ['Reference (Personal pronoun)', 'Ellipsis', 'Conjunction', 'Lexical cohesion'], 0, 'The pronoun "He" refers back to "John".');
addQ('ch2', 'applied', 'Read: "I need a pen. Do you have one?" What type of cohesion is "one"?', ['Partial Ellipsis', 'Reference', 'Conjunction', 'Lexical repetition'], 0, 'The word "one" stands in for "a pen", which is partial ellipsis.');
addQ('ch2', 'applied', 'Read: "It was raining hard. Therefore, the game was canceled." "Therefore" is:', ['Conjunction (Causal)', 'Reference', 'Ellipsis', 'Lexical cohesion'], 0, '"Therefore" shows the causal relationship between the sentences.');
addQ('ch2', 'applied', 'Read: "The boy climbed the tree. The lad was brave." What links "boy" and "lad"?', ['Lexical cohesion (Synonym)', 'Reference', 'Conjunction', 'Ellipsis'], 0, '"Lad" is a near-synonym for "boy", creating lexical cohesion.');
addQ('ch2', 'applied', 'Read: "I ordered a pizza. The crust was burnt." What links "pizza" and "crust"?', ['Lexical cohesion (Collocation/Meronymy)', 'Conjunction', 'Reference', 'Ellipsis'], 0, 'Crust is a part of a pizza, establishing a lexical relationship.');
addQ('ch2', 'applied', 'Read: "Did you finish the homework? Yes, I did." "I did" is an example of:', ['Partial Ellipsis', 'Reference', 'Lexical repetition', 'Conjunction'], 0, '"did" stands in for "finished the homework".');
addQ('ch2', 'applied', 'Read: "She loved roses. The flowers filled her room." What links "roses" and "flowers"?', ['Lexical cohesion (Superordinate)', 'Conjunction', 'Reference', 'Ellipsis'], 0, '"Flowers" is the superordinate term for "roses".');
addQ('ch2', 'applied', 'Read: "Some people like tea. Others prefer coffee." "Others" is an example of:', ['Reference (Comparative construction)', 'Conjunction', 'Lexical cohesion', 'Full ellipsis'], 0, '"Others" acts as a reference comparing to the first group of people.');
addQ('ch2', 'applied', 'Read: "He tried hard. However, he failed." "However" is:', ['Conjunction (Adversative)', 'Conjunction (Additive)', 'Reference', 'Lexical cohesion'], 0, '"However" indicates contrast, making it an adversative conjunction.');
addQ('ch2', 'applied', 'Read: "I want the red apple. You can have the green." What cohesion is present here?', ['Full Ellipsis (omission of "apple")', 'Reference', 'Conjunction', 'Lexical synonymy'], 0, 'The word "apple" is fully omitted after "green".');


// ================= CHAPTER 3 (20 Qs) =================
// Theory (10)
addQ('ch3', 'theoretical', 'What does Modality express?', ['Opinion or attitude regarding a claim', 'The tense of a verb', 'The plural form of a noun', 'The exact time an event occurred'], 0, 'Modality is the linguistic means for qualifying claims (probability, obligation, etc.).');
addQ('ch3', 'theoretical', 'Which of the following is a Modal Auxiliary verb?', ['Must', 'Walk', 'Is', 'Have'], 0, '"Must" is a modal auxiliary.');
addQ('ch3', 'theoretical', 'What parameter of qualification does "should" typically express?', ['Obligation / Probability', 'Usuality', 'Willingness', 'Definiteness'], 0, '"Should" typically expresses obligation or strong probability.');
addQ('ch3', 'theoretical', 'What are the two common modality meanings of "WILL"?', ['Probability and Willingness', 'Obligation and Usuality', 'Certainty and Past tense', 'Ability and Permission'], 0, '"Will" commonly carries probability or willingness.');
addQ('ch3', 'theoretical', 'Which is a Modal Adverb?', ['Probably', 'Quickly', 'Loudly', 'Slowly'], 0, '"Probably" expresses a degree of certainty/probability.');
addQ('ch3', 'theoretical', 'What is "Metaphorized" or "advanced" modality?', ['Using verbs like "think" or "reckon" to express probability', 'Using metaphors in poetry', 'Using advanced vocabulary', 'Using modal verbs in the past tense'], 0, 'English uses phrases like "I think" to encode modality qualifications.');
addQ('ch3', 'theoretical', 'What defines a Generic Sentence?', ['It asserts something to be a general truth', 'It is a sentence without a subject', 'It uses the past perfect tense', 'It only describes specific individuals'], 0, 'Generic sentences assert truths about an open set of things, typically in present tense.');
addQ('ch3', 'theoretical', 'Which parameter does "usually" express?', ['Usuality', 'Probability', 'Obligation', 'Willingness'], 0, '"Usually" expresses the usuality or frequency of a state.');
addQ('ch3', 'theoretical', 'Which modal verb expresses the strongest obligation?', ['Must', 'Might', 'Could', 'Would'], 0, '"Must" expresses absolute obligation.');
addQ('ch3', 'theoretical', 'If "will" is used purely for future time reference, it is called:', ['Unmodalized futurity', 'Advanced modality', 'Generic modality', 'Usuality'], 0, 'When it carries no attitude, it is unmodalized futurity.');
// Applied (10)
addQ('ch3', 'applied', 'Read: "Billings might be in Montana." What is the modality parameter?', ['Probability', 'Obligation', 'Willingness', 'Usuality'], 0, '"Might" indicates a low degree of probability.');
addQ('ch3', 'applied', 'Read: "You must complete the assignment." What is the modality parameter?', ['Obligation', 'Probability', 'Willingness', 'Usuality'], 0, '"Must" indicates strong obligation.');
addQ('ch3', 'applied', 'Read: "I think it is going to rain." This is an example of:', ['Metaphorized modality', 'Generic sentence', 'Unmodalized futurity', 'Modal adverb'], 0, '"I think" is metaphorized modality expressing probability.');
addQ('ch3', 'applied', 'Read: "Cats are independent animals." This is an example of:', ['Generic sentence', 'Metaphorized modality', 'Modal adverb', 'Probability'], 0, 'It asserts a general, timeless truth about an open set (cats).');
addQ('ch3', 'applied', 'Read: "Will you have some tea?" What does "will" express here?', ['Willingness', 'Probability', 'Obligation', 'Usuality'], 0, 'It asks about the person\'s willingness to have tea.');
addQ('ch3', 'applied', 'Read: "That lad will come to a sticky end." What does "will" express here?', ['Probability/Prediction', 'Willingness', 'Obligation', 'Usuality'], 0, 'It expresses a strong probability or prediction about the future.');
addQ('ch3', 'applied', 'Read: "She definitely left the building." "Definitely" functions as:', ['A modal adverb expressing certainty', 'A modal auxiliary verb', 'Metaphorized modality', 'A generic sentence'], 0, '"Definitely" qualifies the claim with absolute certainty.');
addQ('ch3', 'applied', 'Read: "Billings is usually in Montana." What does this express?', ['Usuality', 'Probability', 'Obligation', 'Willingness'], 0, 'The adverb "usually" indicates how often the state occurs.');
addQ('ch3', 'applied', 'Read: "I guess he is late." What type of modality is used?', ['Metaphorized modality', 'Modal auxiliary', 'Generic modality', 'Modal adverb'], 0, '"I guess" encodes probability using a verb phrase.');
addQ('ch3', 'applied', 'Read: "Water boils at 100 degrees Celsius." What is this?', ['Generic sentence', 'Advanced modality', 'Obligation', 'Willingness'], 0, 'It states a timeless scientific truth.');


// ================= CHAPTER 6 (20 Qs) =================
// Theory (10)
addQ('ch6', 'theoretical', 'What is the minimum requirement for a narrative?', ['A text where the reader perceives a significant, causally related change', 'A text with dialogue', 'A text written in past tense', 'A text longer than 10 pages'], 0, 'A narrative requires a change of state that is causally related.');
addQ('ch6', 'theoretical', 'According to William Labov, how many elements are in a fully formed oral narrative?', ['Six', 'Four', 'Eight', 'Three'], 0, 'Labov suggested six elements for a fully formed oral narrative.');
addQ('ch6', 'theoretical', 'Which of Labov’s elements provides a one-sentence summary of what happened?', ['Abstract', 'Orientation', 'Evaluation', 'Coda'], 0, 'The Abstract summarizes the story in a nutshell.');
addQ('ch6', 'theoretical', 'What does the Orientation element establish?', ['Who was involved, when, and where', 'The final outcome', 'The moral of the story', 'The background causes'], 0, 'Orientation sets the scene (who, when, where).');
addQ('ch6', 'theoretical', 'Which element contains the actual events ("Then what happened?")?', ['Complicating action', 'Resolution', 'Abstract', 'Evaluation'], 0, 'Complicating action contains the sequential events.');
addQ('ch6', 'theoretical', 'What is the purpose of the Evaluation element?', ['To highlight how the story is interesting or add background', 'To summarize the plot', 'To introduce the characters', 'To end the story'], 0, 'Evaluation adds comments, reactions, or background to make the story interesting.');
addQ('ch6', 'theoretical', 'In Evaluation, what are "Comparators"?', ['Alternative narrative developments not followed up (e.g., negatives, modals)', 'Gestures and emphases', 'Secondary activities', 'Background reasons'], 0, 'Comparators explore what didn\'t happen to highlight what did.');
addQ('ch6', 'theoretical', 'Which Labov element reveals "what finally happened"?', ['Resolution', 'Coda', 'Complicating action', 'Orientation'], 0, 'The Resolution gives the final outcome of the events.');
addQ('ch6', 'theoretical', 'What is the function of the Coda?', ['To relate the story back to the present or offer a moral', 'To introduce the main conflict', 'To summarize the events in one sentence', 'To provide background reasons'], 0, 'The Coda bridges the story back to the "here and now".');
addQ('ch6', 'theoretical', 'Which subtype of Evaluation provides background reasons and causes?', ['Explicative', 'Correlative', 'Intensifying', 'Comparator'], 0, 'Explicative evaluation explains why things happened.');
// Applied (10)
addQ('ch6', 'applied', 'Read: "Let me tell you about the time I almost drowned." Which Labov element is this?', ['Abstract', 'Orientation', 'Complicating action', 'Resolution'], 0, 'It is a one-sentence summary setting up the story.');
addQ('ch6', 'applied', 'Read: "It was a hot Tuesday in 1999 at the local pool." Which element is this?', ['Orientation', 'Coda', 'Evaluation', 'Abstract'], 0, 'It provides the who, where, and when.');
addQ('ch6', 'applied', 'Read: "I jumped in, but my foot got stuck in the drain." Which element is this?', ['Complicating action', 'Abstract', 'Resolution', 'Coda'], 0, 'It describes the main sequential events.');
addQ('ch6', 'applied', 'Read: "If I hadn\'t held my breath, I would have died." Which evaluation type is this?', ['Comparator', 'Intensifying', 'Correlative', 'Explicative'], 0, 'It uses a hypothetical alternative (what didn\'t happen) to emphasize the danger.');
addQ('ch6', 'applied', 'Read: "I was waving my arms frantically!" Which evaluation type is this?', ['Intensifying', 'Explicative', 'Comparator', 'Correlative'], 0, 'It intensifies the action to show panic.');
addQ('ch6', 'applied', 'Read: "Finally, the lifeguard pulled me out and I coughed up water." Which element is this?', ['Resolution', 'Orientation', 'Coda', 'Abstract'], 0, 'It states the final outcome of the complicating action.');
addQ('ch6', 'applied', 'Read: "And that\'s why I never swim in the deep end anymore." Which element is this?', ['Coda', 'Orientation', 'Abstract', 'Complicating action'], 0, 'It provides a moral and bridges the past event to the speaker\'s present life.');
addQ('ch6', 'applied', 'Read: "While I was drowning, a kid was eating an ice cream nearby." Which evaluation type is this?', ['Correlative', 'Explicative', 'Comparator', 'Intensifying'], 0, 'It mentions a secondary activity contemporaneous with the main event.');
addQ('ch6', 'applied', 'Read: "The drain cover was loose because the pool lacked maintenance." Which evaluation type is this?', ['Explicative', 'Correlative', 'Intensifying', 'Comparator'], 0, 'It provides the background reason/cause for the event.');
addQ('ch6', 'applied', 'Read: "Suddenly, the water turned freezing cold." This contributes to which narrative element?', ['Complicating action', 'Abstract', 'Coda', 'Resolution'], 0, 'It is part of the sequence of events driving the story forward.');

fs.writeFileSync('./src/data/quiz-questions.json', JSON.stringify(questions, null, 2));
fs.writeFileSync('./src/data/exam-questions.json', JSON.stringify(questions, null, 2));

console.log('Successfully generated 80 questions (20 per chapter) for both quiz and exam.');
