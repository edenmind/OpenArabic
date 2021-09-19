const truncate = (stringToTruncate, truncateLength) => {
  const cln = stringToTruncate.replace(" \n", "");
  return cln.length > truncateLength ? cln.substr(0, truncateLength - 1) + "..." : cln;
};

const removeLinebreak = (stringWithLineBreaks) => {
  var stringWithoutLineBreaks = stringWithLineBreaks.replace(/(\r\n|\n|\r)/gm, "");
  return stringWithoutLineBreaks;
};

export { truncate, removeLinebreak };
