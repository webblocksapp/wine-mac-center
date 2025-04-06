export const escapeRegExp = (input: string) => {
  // List of special characters in regular expressions
  const specialCharacters = [
    '\\',
    '.',
    '*',
    '+',
    '?',
    '|',
    '(',
    ')',
    '[',
    ']',
    '{',
    '}',
    '^',
    '$',
  ];

  // Escape each special character in the input string
  const escapedString = input.replace(
    new RegExp(`[${specialCharacters.join('\\')}]`, 'g'),
    '\\$&',
  );

  return escapedString;
};
