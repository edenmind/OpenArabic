/* eslint-disable implicit-arrow-linebreak */
export const truncate = (stringToTruncate, truncateLength) => {
  const cleanString = stringToTruncate.replace(' \n', '')
  return cleanString.length > truncateLength
    ? `${cleanString.slice(0, Math.max(0, truncateLength - 1))}...`
    : cleanString
}

export const removeLineBreak = (stringWithLineBreaks) => stringWithLineBreaks.replace(/(\r\n|\n|\r)/gm, '')

export const addSpaceAfterDot = (text) => {
  return text.replace(/\s*([!,.:;?]+)(?!\s*$)\s*/g, '$1 ')
}

export const filterArrayFromEmptyElements = (arrayToFilter, filterFunction) =>
  arrayToFilter.filter((element) => filterFunction(element))
