export const stringShortening = (
  originalString: string,
  maximumWords: number
): string => {
  const words = originalString.split(' ');
  const returnedString = words.slice(0, maximumWords).join(' ');
  return returnedString;
};
