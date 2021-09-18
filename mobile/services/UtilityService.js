const truncate = (stringToTruncate, truncateLength) => {
  const cln = stringToTruncate.replace(" \n", "");
  return cln.length > truncateLength
    ? cln.substr(0, truncateLength - 1) + "..."
    : cln;
};

export { truncate };
