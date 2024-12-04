import { faker } from '@faker-js/faker';

import { ColumnsWrapper } from '../StorybookUtilities';

import { MultiContentPanel } from './MultiContentPanel';

import type { MultiContentPanelItem } from './MultiContentPanel';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MultiContentPanel',
  component: MultiContentPanel,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof MultiContentPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

faker.seed(123);

const items = [
  {
    value: 'tab1',
    title: 'Tab 1',
    content: (
      <div>
        {Array.from({ length: 6 }).map((_, i) => {
          const Item = `h${i + 1}` as keyof JSX.IntrinsicElements;
          // eslint-disable-next-line react/no-array-index-key
          return <Item key={i}>Heading {i + 1}</Item>;
        })}
      </div>
    ),
  },
  {
    value: 'tab2',
    title: 'Tab 2',
    content: (
      <ul>
        {Array.from({ length: 10 }).map((_, i) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={i}>List item N{i + 1}</li>;
        })}
      </ul>
    ),
  },
];

const multipleItems = Array.from({ length: 20 })
  .map(() => faker.helpers.shuffle(items)[0])
  .map((item, i) => ({ ...item, value: `tab${i}`, title: faker.lorem.word() })) as MultiContentPanelItem[];

export const Default = {
  render: () => (
    <ColumnsWrapper>
      <MultiContentPanel items={items} defaultValue="tab1" height={200} />
      <MultiContentPanel items={multipleItems} defaultValue="tab1" height={200} />
    </ColumnsWrapper>
  ),
} satisfies Story;
