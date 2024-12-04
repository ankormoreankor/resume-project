import { Button } from '../Button/Button';
import { ResizableInput } from '../ResizableInput/ResizableInput';
import { ResizableTextarea } from '../ResizableTextarea/ResizableTextarea';

import { InputWrapper } from './InputWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'InputWrapper',
  component: InputWrapper,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof InputWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <InputWrapper>
        <ResizableInput />
      </InputWrapper>
      <InputWrapper variant="destructive">
        <ResizableTextarea style={{ width: '100%' }} minRows={4} />
      </InputWrapper>
      <InputWrapper debugProps={{ state: { isFocused: true } }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="bordered">Cancel</Button>
          <Button debugProps={{ state: { isFocused: true } }}>Submit</Button>
        </div>
      </InputWrapper>
    </div>
  ),
} satisfies Story;
