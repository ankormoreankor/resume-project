import { Button } from '../Button/Button';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { Select } from '../Select/Select';
import { ColumnsWrapper } from '../StorybookUtilities';

import { MultiTrigger } from './MultiTrigger';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MultiTrigger',
  component: MultiTrigger,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof MultiTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

const dropdownItems = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
];

export const Default = {
  render: () => (
    <ColumnsWrapper>
      With button and dropdownMenu:
      <MultiTrigger data-test="test">
        <Button onClick={() => alert('button clicked')}>Click</Button>
        <DropdownMenu items={dropdownItems} triggerProps={{ onClick: () => alert('dropdown clicked') }}>
          Some
        </DropdownMenu>
      </MultiTrigger>
      With label, button, disabled button, select and dropdown:
      <MultiTrigger data-test="test">
        <span style={{ padding: 6 }}>Label</span>
        <Button onClick={() => alert('button clicked')} tooltipProps={{ content: 'This button is not disabled' }}>
          Click
        </Button>
        <Button
          onClick={() => alert('button clicked')}
          state={{ isDisabled: true }}
          tooltipProps={{ content: 'This button is disabled' }}
        >
          Disabled
        </Button>
        <Select
          triggerProps={{ onClick: () => alert('dropdown Some clicked') }}
          items={[{ label: 'Some', value: 'some' }]}
          defaultValue="some"
        />
        <DropdownMenu items={dropdownItems} triggerProps={{ onClick: () => alert('dropdown Else clicked') }}>
          Else
        </DropdownMenu>
      </MultiTrigger>
    </ColumnsWrapper>
  ),
} satisfies Story;
