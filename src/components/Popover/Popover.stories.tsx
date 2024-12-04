import { useState } from 'react';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

import { Popover } from './Popover';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Popover',
  component: Popover,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px 20px 150px 20px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Popover state={{ isDefaultOpen: true }} {...args}>
      <Button>Trigger</Button>
    </Popover>
  ),
} as Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

const TemplateContent = () => (
  <ul>
    <li>Some 1</li>
    <li>Some 2</li>
    <li>Some 3</li>
  </ul>
);

export const Default = {
  args: {
    content: <TemplateContent />,
  },
} satisfies Story;

export const ComplexContent = {
  args: {
    content: (
      <div style={{ display: 'grid', gap: 16 }}>
        <Input type="input" placeholder="Add text" />
        <Button>Some button</Button>
      </div>
    ),
  },
} satisfies Story;

export const CustomTrigger = {
  render: () => (
    <Popover content={<TemplateContent />} state={{ isDefaultOpen: true }}>
      <h2>Text as a trigger</h2>
    </Popover>
  ),
} satisfies Story;

const ControlledPopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gap: '8px' }}>
      <Button onClick={() => setIsOpen((prev) => !prev)}>Change open state</Button>
      <Popover
        content={<TemplateContent />}
        controlProps={{ isOpen, onOpenChange: () => setIsOpen(!isOpen) }}
        state={{ isDefaultOpen: true }}
      >
        <span>Trigger</span>
      </Popover>
    </div>
  );
};

export const ControlledFromOutside = {
  render: () => <ControlledPopover />,
};
