const textToJSON = (text, ascending = true) => {
  const words = text.match(/\b(\w+)\b/g);
  const freqDict = {};
  words.forEach((word) => {
    if (!(word in freqDict)) {
      freqDict[word] = 1;
    } else {
      freqDict[word] += 1;
    }
  });

  return Object.keys(freqDict)
    .map((word) => [word, freqDict[word]])
    .sort((a, b) => (ascending ? a[1] - b[1] : b[1] - a[1]));
};

export default textToJSON;
