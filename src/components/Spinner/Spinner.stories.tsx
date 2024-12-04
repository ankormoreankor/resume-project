import { Spinner } from './Spinner';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Spinner',
  component: Spinner,
  decorators: [(story) => <div style={{ padding: '20px 100px 500px' }}>{story()}</div>],
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true },
  },
} as Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const WithText = {
  args: {
    text: 'Saving...',
  },
} satisfies Story;

export const WithCustomSize = {
  args: {
    size: 30,
  },
} satisfies Story;
