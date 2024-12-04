import { faker } from '@faker-js/faker';

import { ResizableInput } from './ResizableInput';

import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

const meta = {
  title: 'Resizable Input',
  component: ResizableInput,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof ResizableInput>;

export default meta;

type Story = StoryObj<typeof meta>;

faker.seed(123);

const defaultProps = {
  style: { border: '1px solid black' },
  placeholder: 'Enter text here',
};

const InputWrapper = ({ children, label }: { children: ReactNode; label: string }) => (
  <label style={{ display: 'grid', gap: 8 }}>
    <span>{label}</span>
    {children}
  </label>
);

export const Default = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <InputWrapper label="Default">
        <ResizableInput {...defaultProps} />
      </InputWrapper>
      <InputWrapper label="Input width is equal to placeholder width">
        <ResizableInput {...defaultProps} size={5} />
      </InputWrapper>
      <InputWrapper label="Value passed">
        <ResizableInput {...defaultProps} value={faker.lorem.sentence()} />
      </InputWrapper>
    </div>
  ),
} satisfies Story;
