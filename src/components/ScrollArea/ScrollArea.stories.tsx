import { faker } from '@faker-js/faker';

import { ScrollArea as ScrollAreaComponent } from './ScrollArea';

import type { ScrollAreaProps } from './ScrollArea';
import type { Meta, StoryObj } from '@storybook/react';
import type { PropsWithChildren } from 'react';

const meta = {
  title: 'Utilities/Scrollbar Area',
  component: ScrollAreaComponent,
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true },
  },
} as Meta<typeof ScrollAreaComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const ScrollArea = ({ children, ...props }: PropsWithChildren<ScrollAreaProps>) => (
  <div style={{ width: 250, padding: 16, backgroundColor: 'var(--color-grey-100)' }}>
    <ScrollAreaComponent {...props}>
      <ul style={{ height: 300, whiteSpace: 'nowrap' }}>{children}</ul>
    </ScrollAreaComponent>
  </div>
);

faker.seed(500);

export const Default = {
  render: () => (
    <ScrollArea>
      {faker.helpers.shuffle(faker.lorem.sentences(20).split('.')).map((sentence) => (
        <li key={sentence}>{sentence}</li>
      ))}
    </ScrollArea>
  ),
} satisfies Story;

export const Vertical = {
  render: () => (
    <ScrollArea isAlwaysVisible>
      {faker.helpers.shuffle(faker.lorem.sentences(20).split(' ')).map((sentence) => (
        <li key={sentence}>{sentence}</li>
      ))}
    </ScrollArea>
  ),
} satisfies Story;

export const Both = {
  render: () => (
    <ScrollArea isAlwaysVisible>
      {faker.helpers.shuffle(faker.lorem.sentences(20).split('.')).map((sentence) => (
        <li key={sentence}>{sentence}</li>
      ))}
    </ScrollArea>
  ),
} satisfies Story;

export const WithScrollDown = {
  render: () => (
    <ScrollArea isAlwaysVisible scrollDownButtonProps={{ isActive: true }}>
      {faker.helpers.shuffle(faker.lorem.sentences(20).split('.')).map((sentence) => (
        <li key={sentence}>{sentence}</li>
      ))}
    </ScrollArea>
  ),
} satisfies Story;
