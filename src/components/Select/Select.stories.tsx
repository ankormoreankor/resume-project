import { faker } from '@faker-js/faker';
import { useState } from 'react';

import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { CalendarIcon, FolderClosedGreyIcon, HubRoundIcon, HubRoundSmallIcon } from '../icons';
import { Shortcut } from '../Shortcut/Shortcut';
import { ColumnsWrapper } from '../StorybookUtilities';

import { Select } from './Select';

import type { SelectProps } from './Select';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Select',
  component: Select,
  decorators: [(story) => <div style={{ padding: '20px 50px 1000px', width: 1200 }}>{story()}</div>],
  parameters: { chromatic: { delay: 1500, pauseAnimationAtEnd: true, viewports: [1200] } },
} as Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

faker.seed(5);

const getItems = ({
  count,
  words,
  withIcons,
  withShortcut,
  withNestedItems,
  withTooltip,
}: {
  count: number;
  words?: number;
  withIcons?: boolean;
  withShortcut?: boolean;
  withNestedItems?: boolean;
  withTooltip?: boolean;
}) =>
  Array.from({ length: count }, (_, index) => {
    const label = faker.lorem.words(words);

    return {
      label,
      value: label,
      ...(withIcons && { iconLeft: CalendarIcon }),
      ...(withShortcut && { shortcut: <Shortcut values={['D']} /> }),
      ...(withNestedItems && { depth: index % 5 }),
      ...(withTooltip && {
        tooltipProps: {
          content: 'content',
          placement: 'left' as const,
        },
      }),
      ...Avatar,
    };
  });

const defaultItems = getItems({ count: 10, words: 4 });
const defaultSelectedItems = defaultItems[3]?.value;

const SelectStory = (props: SelectProps) => (
  <>
    <div>
      <Select {...props} size="small" />
    </div>
    <div>
      <Select {...props} size="medium" />
    </div>
    <div>
      <Select {...props} size="large" />
    </div>
  </>
);

const triggerProps: SelectProps['triggerProps'] = {
  tooltipProps: { content: 'Tooltip content', placement: 'top' },
};

export const Default = {
  render: () => (
    <ColumnsWrapper style={{ gridTemplateColumns: 'repeat(4, auto)', alignItems: 'start', justifyContent: 'start' }}>
      <span />
      <span>Small</span>
      <span>Medium</span>
      <span>Large</span>
      Default:{' '}
      <SelectStory
        items={defaultItems}
        onValueChange={(value: string) => console.log('value:', value)}
        {...{ triggerProps }}
      />
      Value selected:{' '}
      <SelectStory
        items={defaultItems}
        onValueChange={(value: string) => console.log('value:', value)}
        defaultValue={defaultSelectedItems}
      />
      Default (disabled): <SelectStory items={defaultItems} state={{ isDisabled: true }} />
      Value selected (disabled): <SelectStory items={defaultItems} state={{ isLoading: true }} />
      With inner label:{' '}
      <SelectStory items={defaultItems} triggerProps={{ innerLabel: 'Inner label', innerLabelIcon: CalendarIcon }} />
      Content overflow:{' '}
      <div style={{ maxWidth: 200, padding: 16, border: '1px solid' }}>
        <Select size="small" items={defaultItems} defaultValue={defaultSelectedItems} />
      </div>
      <div style={{ maxWidth: 200, padding: 16, border: '1px solid' }}>
        <Select items={defaultItems} defaultValue={defaultSelectedItems} />
      </div>
      <div style={{ maxWidth: 200, padding: 16, border: '1px solid' }}>
        <Select size="large" items={defaultItems} defaultValue={defaultSelectedItems} />
      </div>
    </ColumnsWrapper>
  ),
} satisfies Story;

export const Wide = {
  render: () => (
    <div style={{ maxWidth: 350 }}>
      <Select
        width="wide"
        items={getItems({ count: 10, words: 10 })}
        onValueChange={(value: string) => console.log('value:', value)}
        controlProps={{ open: true }}
      />
    </div>
  ),
};

export const Opened = {
  args: {
    items: defaultItems,
    controlProps: { open: true },
  },
} satisfies Story;

export const LongList = {
  args: {
    items: getItems({ count: 20, words: 5 }),
    controlProps: { open: true },
  },
} satisfies Story;

export const WithIcons = {
  args: {
    items: getItems({ count: 10, words: 2, withIcons: true }),
    triggerProps: { icon: HubRoundIcon, iconProps: { size: 20 } },
    controlProps: { open: true },
  },
} satisfies Story;

export const WithShortcuts = {
  args: {
    items: getItems({ count: 10, words: 4, withIcons: true, withShortcut: true }),
    triggerProps: { icon: HubRoundIcon, iconProps: { size: 20 } },
    controlProps: { open: true },
  },
} satisfies Story;

export const WithTooltips = {
  args: {
    items: getItems({ count: 10, words: 4, withIcons: true, withShortcut: true, withTooltip: true }),
    triggerProps: { icon: HubRoundIcon, iconProps: { size: 20 } },
    controlProps: { open: true },
  },
} satisfies Story;

export const WithCustomContent = {
  args: {
    items: [
      {
        label: 'Label_1',
        renderLabel: () => (
          <div>
            <Avatar /> Label_1
          </div>
        ),
        value: 'value_1',
        renderItem: () => (
          <ul>
            <li>element 1</li>
            <li>element 2</li>
          </ul>
        ),
      },
      {
        label: 'Label_2',
        value: 'value_2',
        renderItem: () => (
          <div>
            <h1>Some title</h1>
            <p>Some text</p>
          </div>
        ),
      },
      {
        label: 'Label_3',
        value: 'value_3',
        renderItem: () => (
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 4, width: '100%' }}>
            <HubRoundSmallIcon />
            <span>All Apps</span>
            <span style={{ display: 'flex' }}>
              <HubRoundSmallIcon />
              <HubRoundSmallIcon />
              <HubRoundSmallIcon />
            </span>
          </div>
        ),
      },
    ],
    triggerProps: { icon: HubRoundIcon, iconProps: { size: 20 } },
    controlProps: { open: true },
    defaultValue: 'value_1',
  },
} satisfies Story;

const ControllableSelect = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gap: '8px', width: 'fit-content' }}>
      <Button onClick={() => setIsOpen((prev) => !prev)}>Change open state</Button>
      <Select items={defaultItems} controlProps={{ open: isOpen, onOpenChange: () => setIsOpen(!isOpen) }} />
    </div>
  );
};

export const Controllable = {
  render: () => <ControllableSelect />,
};

export const WithNestedItems = {
  args: {
    controlProps: { open: true },
    items: getItems({ count: 20, words: 3, withNestedItems: true }).map((item) => ({
      ...item,
      iconLeft: FolderClosedGreyIcon,
    })),
  },
} satisfies Story;
