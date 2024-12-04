import { faker } from '@faker-js/faker';
import { upperFirst } from 'lodash';
import { useState } from 'react';

import { ResizableTextarea } from './ResizableTextarea';

import type { Meta, StoryObj } from '@storybook/react';

faker.seed(200);

const meta = {
  title: 'Resizable Textarea',
  component: ResizableTextarea,
  decorators: [
    (Story) => (
      <div style={{ padding: 20, minHeight: '100vh', backgroundColor: 'lightgrey' }}>
        <Story />
        <p>
          {faker.lorem.paragraphs(20)} <br />
        </p>
      </div>
    ),
  ],
} as Meta<typeof ResizableTextarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const OneLine = {
  args: {
    maxRows: 1,
  },
} satisfies Story;

export const NonResizable8Lines = {
  args: {
    minRows: 8,
    maxRows: 8,
  },
} satisfies Story;

export const ResizableFrom4To8Lines = {
  args: {
    minRows: 4,
    maxRows: 8,
  },
} satisfies Story;

export const ValuePassed = {
  args: {
    defaultValue: faker.lorem.paragraphs(10),
  },
} satisfies Story;

export const UpperFirstLetter = {
  args: {
    defaultValue: upperFirst(faker.lorem.word(5)),
  },
  render: ({ defaultValue }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(defaultValue);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(upperFirst(e.target.value));
    };

    return <ResizableTextarea defaultValue={value} onChange={handleInput} />;
  },
} satisfies Story;
