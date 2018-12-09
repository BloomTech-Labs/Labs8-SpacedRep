const handleCardSnippets = (card) => {
  const { question, answer } = card;
  const abstractSnippet = (type, data) => {
    let cache = [];
    const contentType = [];
    const trigger = '```';
    const content = data.split(trigger);

    const filteredContent = [];
    content.forEach((element) => {
      if (element !== '') filteredContent.push(element);
    });

    //   // if data starts with text
    if (data.substring(0, 3) !== trigger) {
      contentType.push('txt');
      cache.push('txt');
    }

    for (let i = 0; i < data.length; i += 1) {
      const substr = data.substring(i, i + 3);

      // if the current index + next 2 chars are ```, add to cache
      if (substr === trigger) {
        // if cache has matching ```, push code type and clear cache
        // end of code snippet
        if (cache.includes('code')) {
          contentType.push('code');
          cache = [];
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
  const formattedCard = card; // eslint fix...
  formattedCard.qFilteredContent = questionData.filteredContent;
  formattedCard.aFilteredContent = answerData.filteredContent;
  formattedCard.qContentType = questionData.contentType;
  formattedCard.aContentType = answerData.contentType;

  return formattedCard;
};

export default handleCardSnippets;
