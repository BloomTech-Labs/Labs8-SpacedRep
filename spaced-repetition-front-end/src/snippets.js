const handleCardSnippets = (card) => {
  const { question, answer } = card;
  const abstractSnippet = (type, data) => {
    let cache = [];
    const contentType = [];
    const trigger = '```';
    const content = data.split(trigger);

    const filteredContent = [];
    content.forEach((element) => {
      if (element !== ' ' && element !== '') filteredContent.push(element);
    });

    //   // if data starts with text
    if (data.substring(0, 3) !== trigger) {
      contentType.push('txt');
      cache.push('txt');
    }

    for (let i = 0; i < data.length; i += 1) {
      const substr = data.substring(i, i + 3);
      console.log(substr)

      // if the current index + next 2 chars are ```, add to cache
      if (substr === trigger) {
        // if cache has matching ```, push code type and clear cache
        // end of code snippet
        if (cache.includes('code')) {
          contentType.push('code');
          cache = [];
          console.log('next', data.substring(i + 3, i + 6), i + 3, i + 6)
          if (data.substring(i + 3, i + 6) === trigger) {
            cache.push('code');
            i = i + 7;
          } else if (data.substring(i + 3, i + 6) !== trigger && data.substring(i + 3, i + 6) !== '' && data.substring(i + 3, i + 6) !== ' ``' && data.substring(i + 3, i + 6) !== '  `') {
            contentType.push('txt');
            i = i + 7;
            console.log('ct', contentType)
          }
        } else {
          // beginning of code snippet
          cache.push('code');
        }
        // if cache is empty, the next 3 chars aren't ```, and current char isn't ' ',
        // current content is txt
        if (cache.length === 0 && substr !== trigger && data[i] !== ' ') {
          cache.push('txt');
          contentType.push('txt');
        }
      }
    }
    return { filteredContent, contentType, type };
  };

  const questionData = abstractSnippet('question', question);
  const answerData = abstractSnippet('answer', answer);

  // assign formatted data to card for passing as prop
  const formattedCard = card;
  formattedCard.qFilteredContent = questionData.filteredContent;
  formattedCard.aFilteredContent = answerData.filteredContent;
  formattedCard.qContentType = questionData.contentType;
  formattedCard.aContentType = answerData.contentType;

  return formattedCard;
};


export default handleCardSnippets;

// tests
// const simpleCard = { question: "Hello", answer: "Answer"}; //Good
// const snippetInFirst = { question: "```Snippet```", answer: "Answer"}; //Good
// const consecutiveSnippets = { question: "```SnippetA``````SnippbetB```", answer: "Answer"}; //Good
// const snippetInLast = { question: "This has a snippet next. ```SnippbetB```", answer: "Answer"}; //Good
// const consecutiveSnippetsSpace = { question: "```SnippetA``` ```SnippbetB```", answer: "Answer"}; //Good
// const codetxtcode = {question: "```SnippetA``` This is some text.```SnippbetB```", answer: "Answer"} //Good
// const txtcodetxtcode = {question: "Hi```SnippetA``` This is some text.```SnippbetB```", answer: "Answer"} //Good

// console.log(handleCardSnippets(simpleCard));
// console.log(handleCardSnippets(snippetInFirst));
// console.log(handleCardSnippets(consecutiveSnippets));
// console.log(handleCardSnippets(snippetInLast));
// console.log(handleCardSnippets(consecutiveSnippetsSpace));
// console.log(handleCardSnippets(codetxtcode));
// console.log(handleCardSnippets(txtcodetxtcode));
