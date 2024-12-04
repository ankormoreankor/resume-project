const ELLIPSIS_LENGTH = 3;
const ELLIPSIS_MAX_LENGTH_DEFAULT = 50;

export const ellipsis = (str: string, maxLength: number = ELLIPSIS_MAX_LENGTH_DEFAULT): string => {
  const stringMaxLength = maxLength - ELLIPSIS_LENGTH;
  if (str.length > maxLength - ELLIPSIS_LENGTH) return `${str.substring(0, stringMaxLength)}...`;

  return str;
};

export const checkIfHexColor = (color: string): boolean => {
  const hexRegex = /^#?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/;
  return hexRegex.test(color);
};

export const pluralize = (count: number, noun: string, includeCount = false, suffix = 's') => {
  const pluralizedNoun = `${noun}${count !== 1 ? suffix : ''}`;

  if (includeCount) {
    return `${count} ${pluralizedNoun}`;
  }

  return pluralizedNoun;
};
