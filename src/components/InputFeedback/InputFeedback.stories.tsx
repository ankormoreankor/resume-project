import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { ColumnsWrapper } from '../StorybookUtilities';

import { InputFeedback } from './InputFeedback';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Input Feedback',
  component: InputFeedback,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof InputFeedback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <ColumnsWrapper style={{ gridTemplateColumns: 'repeat(3, 300px)' }}>
      <InputFeedback text="Some message">
        <Input type="input" placeholder="enter text" />
      </InputFeedback>
      <InputFeedback text="Some message">
        <Select items={[{ label: 'Some', value: 'some' }]} defaultValue="some" />
      </InputFeedback>
      <InputFeedback text="Stop pressing this button" variant="destructive">
        <Button variant="destructive">Don&apos;t press me</Button>
      </InputFeedback>
    </ColumnsWrapper>
  ),
} satisfies Story;
