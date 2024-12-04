import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';

import { InputLabel } from './InputLabel';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Input Label',
  component: InputLabel,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof InputLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(4, 1fr)' }}>
      <InputLabel text="Label">
        <Input type="input" />
      </InputLabel>
      <InputLabel text="Label">
        <Select items={[]} />
      </InputLabel>
      <InputLabel text="Label">
        <Button>Labeled button</Button>
      </InputLabel>
    </div>
  ),
} satisfies Story;
