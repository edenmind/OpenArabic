export const truncate = (stringToTruncate, truncateLength) => {
  const cleanString = stringToTruncate.replace(' \n', '');
  return cleanString.length > truncateLength
    ? `${cleanString.substr(0, truncateLength - 1)}...`
    : cleanString;
};

export const removeLineBreak = (stringWithLineBreaks) => {
  const stringWithoutLineBreaks = stringWithLineBreaks.replace(
    /(\r\n|\n|\r)/gm,
    '',
  );
  return stringWithoutLineBreaks;
};
