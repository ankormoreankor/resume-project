import { Shortcut } from './Shortcut';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Shortcut',
  component: Shortcut,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'darkgrey',
          width: 400,
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Shortcut>;

export default meta;

type Story = StoryObj<typeof meta>;

const values = ['A', 'then', 'B', 'then', 'C', '@', '⌫', '⌥', '⇧', '⌘', 'CTRL', 'Delete'];

export const Default = {
  args: {
    values,
  },
} satisfies Story;

export const Black = {
  args: {
    values,
    isShortcutBlack: true,
  },
} satisfies Story;

export const WithThenWord = {
  args: {
    values,
    isThenWordWhite: true,
  },
} satisfies Story;

export const Size16 = {
  args: {
    values,
    size: 16,
  },
} satisfies Story;

export const Size14 = {
  args: {
    values,
    size: 14,
  },
} satisfies Story;
