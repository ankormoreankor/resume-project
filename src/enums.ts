export const keyboardKey = {
  Backspace: 'Backspace',
  Semicolon: ';',
  Esc: 'Escape',
  Enter: 'Enter',
  Tab: 'Tab',
  Comma: ',',
  Space: ' ',
  NewLine: '\n',
} as const;

export type KeyboardKey = (typeof keyboardKey)[keyof typeof keyboardKey];
