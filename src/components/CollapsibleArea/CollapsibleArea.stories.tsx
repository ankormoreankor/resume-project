import { faker } from '@faker-js/faker';

import { CollapsibleArea } from './CollapsibleArea';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Collapsible Area',
  component: CollapsibleArea,
  decorators: [
    (Story) => (
      <div style={{ padding: 20, width: 324 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true },
  },
} as Meta<typeof CollapsibleArea>;

export default meta;

type Story = StoryObj<typeof meta>;

faker.seed(5);

export const Default = {
  args: {
    header: 'Header',
    children: faker.lorem.paragraphs(3),
  },
} satisfies Story;
