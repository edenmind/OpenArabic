var englishParagraph = 'This is a sentence.* This is another sentence.';
var arabicParagraph =
  'هذه جملة باللغة العربية. * هذه جملة أخرى باللغة العربية.';

var englishSentences = englishParagraph.split('*');
var arabicSentences = arabicParagraph.split('*');

englishSentences.forEach((element) => {
  console.log(element);
});
