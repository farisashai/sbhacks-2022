import * as historyQuestions from './history.json';

export const textToJSON = (text, ascending = false) => {
  const stopwords = [
    'a',
    'about',
    'above',
    'after',
    'again',
    'against',
    'all',
    'am',
    'an',
    'and',
    'any',
    'are',
    "aren't",
    'as',
    'at',
    'be',
    'because',
    'been',
    'before',
    'being',
    'below',
    'between',
    'both',
    'but',
    'by',
    "can't",
    'cannot',
    'could',
    "couldn't",
    'did',
    "didn't",
    'do',
    'does',
    "doesn't",
    'doing',
    "don't",
    'down',
    'during',
    'each',
    'few',
    'for',
    'from',
    'further',
    'had',
    "hadn't",
    'has',
    "hasn't",
    'have',
    "haven't",
    'having',
    'he',
    "he'd",
    "he'll",
    "he's",
    'her',
    'here',
    "here's",
    'hers',
    'herself',
    'him',
    'himself',
    'his',
    'how',
    "how's",
    'i',
    "i'd",
    "i'll",
    "i'm",
    "i've",
    'if',
    'in',
    'into',
    'is',
    "isn't",
    'it',
    "it's",
    'its',
    'itself',
    "let's",
    'me',
    'more',
    'most',
    "mustn't",
    'my',
    'myself',
    'no',
    'nor',
    'not',
    'of',
    'off',
    'on',
    'once',
    'only',
    'or',
    'other',
    'ought',
    'our',
    'ours',
    'ourselves',
    'out',
    'over',
    'own',
    'same',
    "shan't",
    'she',
    "she'd",
    "she'll",
    "she's",
    'should',
    "shouldn't",
    'so',
    'some',
    'such',
    'than',
    'that',
    "that's",
    'the',
    'their',
    'theirs',
    'them',
    'themselves',
    'then',
    'there',
    "there's",
    'these',
    'they',
    "they'd",
    "they'll",
    "they're",
    "they've",
    'this',
    'those',
    'through',
    'to',
    'too',
    'under',
    'until',
    'up',
    'very',
    'was',
    "wasn't",
    'we',
    "we'd",
    "we'll",
    "we're",
    "we've",
    'were',
    "weren't",
    'what',
    "what's",
    'when',
    "when's",
    'where',
    "where's",
    'which',
    'while',
    'who',
    "who's",
    'whom',
    'why',
    "why's",
    'with',
    "won't",
    'would',
    "wouldn't",
    'you',
    "you'd",
    "you'll",
    "you're",
    "you've",
    'your',
    'yours',
    'yourself',
    'yourselves',
  ];
  text = text.toLowerCase();
  const words = text.match(/\b(\w+)\b/g);
  const freqDict = {};
  words.forEach((word) => {
    if (stopwords.includes(word)) {
      // console.log(word)
      return;
    }
    if (!(word in freqDict)) {
      freqDict[word] = 1;
    } else {
      freqDict[word] += 1;
    }
  });

  // console.log(freqDict);

  return Object.keys(freqDict)
    .map((word) => [word, freqDict[word]])
    .sort((a, b) => (ascending ? a[1] - b[1] : b[1] - a[1]));
};

export const ocr = (text = '') => {
  // Get top 5 words from input
  const sortedWordFreq = textToJSON(text).splice(0, 5);

  console.log(sortedWordFreq);

  // Get all questions containing at least one of the words
  const questionsObjectList = [];
  const questionNumList = [];
  Object.values(historyQuestions).forEach((historyQuestion) => {
    if (!historyQuestion.question) return;
    const question = historyQuestion.question.toLowerCase();
    const result = sortedWordFreq.some((w) => question.includes(w[0]));
    if (result) questionsObjectList.push(historyQuestion);
  });

  console.log('finishing getting questions');

  // Get 5 random question indices in the array
  const numQuestions = questionsObjectList.length;
  let i = 0;
  while (i < 5) {
    const randNum = Math.floor(Math.random() * numQuestions);
    if (!(randNum in questionNumList)) {
      i += 1;
      questionNumList.push(randNum);
    }
  }

  console.log('finishing selecting 5 questions');

  const selectedQuestions = questionNumList.map((index) => historyQuestions[index]);
  selectedQuestions.forEach((question) => {
    let j = 0;
    while (j < 3) {
      const randIndex = Math.floor(Math.random() * numQuestions);
      if (!(historyQuestions[randIndex] in selectedQuestions)) {
        j += 1;
        question.answers.push(historyQuestions[randIndex].answers[0]);
      }
    }
  });

  return selectedQuestions;

  // Fill 4 answers per question
  // const answersList = [];
  // questionNumList.forEach((index) => {
  //   const answerList = [];
  //   const answerIndexList = [index];
  //   answerList.push(questionsObjectList[index].answers[0]);
  //   let j = 0;
  //   while (j < 3) {
  //     const randNum = Math.floor(Math.random() * numQuestions);
  //     if (!(randNum in answerIndexList)) {
  //       j += 1;
  //       answerIndexList.push(randNum);
  //       answerList.push(questionsObjectList[j].answers[0]);
  //     }
  //   }
  //   answersList.push(answerList);
  // });
};

// https://stackoverflow.com/a/12646864
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
