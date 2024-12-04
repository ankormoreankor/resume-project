import { faker } from '@faker-js/faker';
import { useMemo, useState } from 'react';

import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import {
  ArrowRightContainedIcon,
  SuitcaseIcon,
  CompanySpaceIcon,
  InfoCircleIcon,
  InfoFilledIcon,
  LabelIcon,
  PenIcon,
  StarIcon,
  TrashBinStripedIcon,
  UserSmallIcon,
} from '../icons';
import { ColumnsWrapper } from '../StorybookUtilities';
import { ToggleGroup } from '../ToggleGroup/ToggleGroup';
import { Video } from '../Video/Video';

import { DropdownMenu } from './DropdownMenu';

import type { DropdownMenuItem } from './DropdownMenu';
import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

const meta = {
  title: 'Dropdown Menu',
  component: DropdownMenu,
  args: {
    items: [],
    children: 'Trigger',
    triggerProps: { variant: 'primary' },
  },
  decorators: [(story) => <div style={{ padding: '50px 200px 300px 150px' }}>{story()}</div>],
  parameters: { chromatic: { delay: 1000, pauseAnimationAtEnd: true, viewports: [1200] } },
} as Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

faker.seed(123);

export const Default = {
  args: {
    items: [
      {
        value: 'recommendations',
        label: 'Labels',
        icon: LabelIcon,
        onSelect: () => {},
      },
    ],
    state: { isDefaultOpen: true },
  },
} satisfies Story;

export const OpenedAtTop = {
  args: {
    items: [
      {
        value: '123',
        label: 'Add something',
      },
    ],
    state: { isDefaultOpen: true },
    popoverProps: {
      side: 'top',
      align: 'start',
    },
  },
} satisfies Story;

export const WithPopoverAutoWidth = {
  args: {
    children: 'Trigger with long long text',
    items: [
      {
        value: 'recommendations',
        label: 'Labels',
        icon: LabelIcon,
        onSelect: () => {},
      },
    ],
    state: { isDefaultOpen: true },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      <DropdownMenu {...args} popoverProps={{ widthType: 'auto' }}>
        {faker.lorem.words(5)}
      </DropdownMenu>
      <DropdownMenu {...args} popoverProps={{ widthType: 'auto' }}>
        {faker.lorem.sentence()}
      </DropdownMenu>
    </div>
  ),
} satisfies Story;

export const WithDividers = {
  args: {
    items: [
      {
        value: '1',
        label: 'Something',
        onSelect: () => {},
        icon: UserSmallIcon,
      },
      {
        value: '2',
        label: 'Anything',
        onSelect: () => {},
        icon: CompanySpaceIcon,
      },
      {
        value: '3',
        type: 'divider',
      },
      {
        value: '4',
        type: 'destructive',
        label: 'Nothing',
        icon: TrashBinStripedIcon,
        onSelect: () => {},
      },
    ],
    state: { isDefaultOpen: true },
  },
} satisfies Story;

export const Disabled = {
  args: {
    items: [
      {
        value: 'recommendations',
        label: 'Label',
        icon: LabelIcon,
        onSelect: () => console.log('clicked'),
        state: { isDisabled: true },
      },
    ],
    state: { isDefaultOpen: true },
  },
} satisfies Story;

export const WithAvatars = {
  args: {
    items: [
      {
        value: 'avatar',
        label: 'Item with avatar',
        avatarProps: { src: '/images/neo.png', size: 18 },
      },
    ],
    state: { isDefaultOpen: true },
  },
} satisfies Story;

export const WithSubmenus = {
  args: {
    items: [
      {
        value: '1',
        label: 'Normal item',
        icon: LabelIcon,
        onSelect: () => console.log('clicked'),
      },
      {
        value: '2',
        label: 'Submenu item',
        icon: SuitcaseIcon,
        items: [
          {
            value: '0',
            label: 'Normal item',
            icon: PenIcon,
            onSelect: () => console.log('clicked'),
          },
          {
            value: '1',
            label: 'Disabled item',
            icon: InfoCircleIcon,
            state: { isDisabled: true },
          },
          {
            value: '2',
            type: 'divider',
          },
          {
            value: '3',
            type: 'destructive',
            label: 'Destructive item',
            icon: TrashBinStripedIcon,
            items: [
              {
                value: '0',
                type: 'injection',
                content: (
                  <div style={{ padding: 16 }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      A button can be rendered{' '}
                      <Button size="tiny" onClick={() => alert('clicked')}>
                        Click me
                      </Button>
                    </h3>
                    <Divider text="or" />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Badge size="large" type="primaryFilled">
                        Anything
                      </Badge>
                      <Badge size="medium" type="secondaryFilled">
                        else
                      </Badge>
                      <Badge size="small" type="errorFilled">
                        you
                      </Badge>
                      <Badge size="tiny" type="blue">
                        need
                      </Badge>
                    </div>
                  </div>
                ),
              },
              {
                value: '1',
                label: 'Disabled submenu item',
                icon: InfoFilledIcon,
                state: { isDisabled: true },
                items: [],
              },
              {
                value: '2',
                label: 'Normal item',
                icon: StarIcon,
                subitemIcon: ArrowRightContainedIcon,
                onSelect: () => console.log('clicked'),
                items: [
                  {
                    value: '1',
                    type: 'injection',
                    content: (
                      <div style={{ display: 'grid', gap: 8, padding: 8, justifyItems: 'center' }}>
                        <h3>Thanks for watching</h3>
                        <Video
                          sources={[{ type: 'video/mp4', src: '/videos/confused_travolta.mp4' }]}
                          defaultSource="/videos/confused_travolta.mp4"
                          autoPlay
                          loop
                        />
                      </div>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    state: { isDefaultOpen: true },
  },
} satisfies Story;

const ControlledDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gap: '8px' }}>
      <Button onClick={() => setIsOpen((prev) => !prev)}>Change open state</Button>
      <DropdownMenu
        items={[{ value: '123', label: 'Add something' }]}
        controlProps={{ open: isOpen, onOpenChange: () => setIsOpen(!isOpen) }}
      >
        Trigger
      </DropdownMenu>
    </div>
  );
};

export const ControlledFromOutside = {
  render: () => <ControlledDropdown />,
};

const getConfusedTravoltaMenuItem = (value: string) => ({
  value,
  type: 'injection',
  content: (
    <Video
      sources={[{ type: 'video/mp4', src: '/videos/confused_travolta.mp4' }]}
      defaultSource="/videos/confused_travolta.mp4"
      autoPlay
      loop
    />
  ),
});

type ListItem = '1' | '2' | '3';

const WithSwitchableListsComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeList, setActiveList] = useState<ListItem>('1');

  const toggleItems = useMemo(
    () => [
      { item: 'List 1', value: '1' },
      { item: 'List 2', value: '2' },
      { item: 'List 3', value: '3' },
    ],
    [],
  );

  const items: DropdownMenuItem[] = useMemo(
    () => [
      {
        value: '0',
        type: 'injection',
        content: (
          <div style={{ padding: 8 }}>
            <h3>Menu Header</h3>

            <ToggleGroup
              type="single"
              behavior="unresettable"
              items={toggleItems}
              defaultValue="1"
              onValueChange={(value: ListItem) => setActiveList(value)}
            />
          </div>
        ),
      },
      ...((activeList === '1'
        ? [
            {
              value: '0',
              label: 'Normal item of List 1',
              description: faker.lorem.sentence(),
              icon: InfoFilledIcon,
            },
            {
              value: '1',
              label: 'Submenu item of List 1',
              icon: InfoFilledIcon,
              items: [
                {
                  value: '0',
                  label: 'Normal item of List 1',
                  description: faker.lorem.sentence(),
                  icon: InfoFilledIcon,
                },
              ],
            },
          ]
        : []) as DropdownMenuItem[]),
      ...((activeList === '2'
        ? [
            {
              value: '0',
              label: 'Normal item of List 2',
              description: faker.lorem.sentence(),
              icon: InfoFilledIcon,
            },
            {
              value: '1',
              label: 'Submenu item of List 2',
              icon: InfoFilledIcon,
              items: [
                {
                  value: '0',
                  label: 'Normal item of List 2',
                  description: faker.lorem.sentence(),
                  icon: InfoFilledIcon,
                },
              ],
            },
          ]
        : []) as DropdownMenuItem[]),
      ...((activeList === '3'
        ? [
            getConfusedTravoltaMenuItem('0'),
            {
              value: '1',
              label: 'Want more Confused Travolta?',
              description: 'We have much more in the submenu below',
              icon: InfoFilledIcon,
              items: [getConfusedTravoltaMenuItem('0'), getConfusedTravoltaMenuItem('1'), getConfusedTravoltaMenuItem('2')],
            },
          ]
        : []) as DropdownMenuItem[]),
    ],
    [activeList, toggleItems],
  );

  return (
    <DropdownMenu
      items={items}
      controlProps={{ open: isOpen, onOpenChange: () => setIsOpen(!isOpen) }}
      triggerProps={{ content: 'Trigger', variant: 'primary' }}
      popoverProps={{ style: { '--dropdown-menu-popover-max-height': 'none' } as CSSProperties }}
    />
  );
};

export const WithSwitchableLists = {
  render: () => <WithSwitchableListsComponent />,
};

export const WithLongList = {
  args: {
    items: Array.from({ length: 30 }, (_, i) => ({
      value: String(i),
      label: faker.lorem.word(),
      icon: LabelIcon,
    })),
    state: { isDefaultOpen: true },
  },
} satisfies Story;

export const WithCustomSelectableItems = {
  args: {
    items: [
      {
        value: '1',
        renderItem: () => (
          <ul style={{ all: 'revert' }}>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        ),
        onSelect: () => alert('list element selected'),
      },
      {
        value: '2',
        renderItem: () => (
          <Video
            sources={[{ type: 'video/mp4', src: '/videos/confused_travolta.mp4' }]}
            defaultSource="/videos/confused_travolta.mp4"
            autoPlay
            loop
          />
        ),
        onSelect: () => alert('confused Travolta selected'),
      },
    ],
    state: { isDefaultOpen: true },
    popoverProps: { style: { '--dropdown-menu-popover-max-height': 'none' } as CSSProperties },
  },
} satisfies Story;

const defaultItemsForMultiselect = Array.from({ length: 30 }, (_, i) => ({
  value: String(i),
  label: faker.lorem.sentence(),
  icon: LabelIcon,
  onSelect: () => {},
  isChecked: i % 2 === 0,
}));

const WithMultiselectComponent = ({ items: itemsProp }: { items: DropdownMenuItem[] }) => {
  const [items, setItems] = useState(itemsProp);

  const onCheckedChange = (value: string, checked?: boolean) => {
    if (checked === undefined) return;

    setItems((prev) => prev.map((item) => (item.value === value ? { ...item, isChecked: checked } : item)));
  };

  return (
    <DropdownMenu
      items={items}
      state={{ isDefaultOpen: true }}
      triggerProps={{ content: 'Trigger', variant: 'primary' }}
      onCheckedChange={onCheckedChange}
    />
  );
};

const WithMultiselectStory = () => <WithMultiselectComponent items={defaultItemsForMultiselect} />;

const defaultItemsForMultiselectExtended: DropdownMenuItem[] = [
  {
    value: '-1',
    label: 'Additional item',
    icon: LabelIcon,
    onSelect: () => alert('clicked'),
  },
  {
    value: '-2',
    label: 'Another one',
    icon: LabelIcon,
    onSelect: () => alert('clicked'),
  },
  {
    type: 'divider',
    value: '-3',
  },
  ...defaultItemsForMultiselect,
];

const WithMultiselectAndOtherItemsStory = () => {
  return <WithMultiselectComponent items={defaultItemsForMultiselectExtended} />;
};

export const WithMultiselect = {
  render: () => (
    <ColumnsWrapper style={{ gap: 300 }}>
      <WithMultiselectStory />
      <WithMultiselectAndOtherItemsStory />
    </ColumnsWrapper>
  ),
} satisfies Story;
