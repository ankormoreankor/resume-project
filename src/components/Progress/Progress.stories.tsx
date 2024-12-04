import React from 'react';

import { Progress } from './Progress';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Progress',
  component: Progress,
  decorators: [
    (Story) => (
      <div style={{ width: 400, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true },
  },
} as Meta<typeof Progress>;

type ProgressStory = StoryObj<React.ComponentProps<typeof Progress>>;

export const Default: ProgressStory = {
  args: {
    completion: 0,
  },
};

export const HalfwayThrough: ProgressStory = {
  args: {
    completion: 50,
  },
};

export const CompletedProgress: ProgressStory = {
  args: {
    completion: 100,
  },
};
