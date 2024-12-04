import { faker } from '@faker-js/faker';

import { ClockIcon, ListViewIcon, ProfileIcon, TrashBinStripedIcon } from '../icons';
import { Shortcut } from '../Shortcut/Shortcut';

import { CollapsibleMenu } from './CollapsibleMenu';

import type { CollapsibleMenuItem } from './CollapsibleMenu';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Collapsible Menu',
  component: CollapsibleMenu,
  decorators: [
    (Story) => (
      <div style={{ padding: 20, width: 324 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true },
  },
} as Meta<typeof CollapsibleMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

faker.seed(5);

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

const getItems = ({
  isWithRightIcon,
  isWithShortcuts,
  isWithHandlers,
}: { isWithRightIcon?: boolean; isWithShortcuts?: boolean; isWithHandlers?: boolean } = {}): CollapsibleMenuItem[] =>
  Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    label: faker.lorem.words(2),
    iconLeft: faker.helpers.shuffle([
      TrashBinStripedIcon,
      ProfileIcon,
      ListViewIcon,
      ClockIcon,
      ...(isWithRightIcon ? [null, null, null] : []),
    ])[0],
    iconRight: isWithRightIcon
      ? faker.helpers.shuffle([TrashBinStripedIcon, ProfileIcon, ListViewIcon, ClockIcon, null, null, null])[0]
      : null,
    shortcut: isWithShortcuts && (
      <Shortcut
        values={
          faker.helpers.shuffle([
            [faker.helpers.shuffle(LETTERS)[0], 'then', faker.helpers.shuffle(LETTERS)[0]],
            [faker.helpers.shuffle(LETTERS)[0]],
            [],
          ])[0] as unknown as string[]
        }
      />
    ),
    onClick: isWithHandlers ? () => alert(`item is clicked`) : undefined,
    state: { isDisabled: faker.helpers.shuffle([true, false, false, false, false, false, false])[0] },
  }));

export const Default = {
  args: {
    header: 'Header',
    items: getItems(),
  },
} satisfies Story;

export const Opened = {
  args: {
    header: 'Header',
    items: getItems(),
    state: { isDefaultOpen: true },
  },
} satisfies Story;

export const WithHandlers = {
  args: {
    header: 'Header',
    items: getItems({ isWithHandlers: true }),
    state: { isDefaultOpen: true },
  },
} satisfies Story;

export const Disabled = {
  args: {
    header: 'Header',
    items: getItems(),
    state: {
      isDisabled: true,
    },
  },
} satisfies Story;

export const WithRightIcons = {
  args: {
    header: 'Header',
    items: getItems({ isWithRightIcon: true }),
    state: { isDefaultOpen: true },
  },
} satisfies Story;

export const WithShortcuts = {
  args: {
    header: 'Header',
    items: getItems({ isWithShortcuts: true }),
    state: { isDefaultOpen: true },
  },
} satisfies Story;

export const WithSelected = {
  args: {
    header: 'Header',
    items: [
      {
        id: faker.string.uuid(),
        label: faker.lorem.words(2),
      },
      {
        id: faker.string.uuid(),
        label: faker.lorem.words(2),
        state: { isSelected: true },
      },
    ],
    state: { isDefaultOpen: true },
  },
} satisfies Story;
