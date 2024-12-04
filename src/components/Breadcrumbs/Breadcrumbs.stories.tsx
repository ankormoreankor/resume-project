import { faker } from '@faker-js/faker';

import { CloseMiddleIcon, CompanySpaceIcon } from '../icons';

import { Breadcrumbs } from './Breadcrumbs';

import type { IconProps } from '../../types';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';

const meta = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

faker.seed(200);

const getItems = ({ length, icon }: { length: number; icon?: ComponentType<IconProps> }) =>
  Array.from({ length }, (_, i) => {
    const title = faker.helpers.shuffle([faker.lorem.sentence(), faker.lorem.word()])[0] as string;

    return { id: String(i), item: title, onClick: () => alert(title), icon: i === 0 ? icon : undefined };
  });

export const Default = {
  args: {
    items: getItems({ length: 3 }),
  },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <h4>Default</h4>
      <Breadcrumbs items={getItems({ length: 3 })} />
      <h4>2 items</h4>
      <Breadcrumbs items={getItems({ length: 2 })} />
      <h4>1 item</h4>
      <Breadcrumbs items={getItems({ length: 1 })} />
      <h4>10 items 5 showed</h4>
      <Breadcrumbs items={getItems({ length: 10 })} itemsToShow={{ start: 2, end: 3 }} />
      <h4>25 items 20 showed</h4>
      <Breadcrumbs items={getItems({ length: 25 })} itemsToShow={{ start: 10, end: 10 }} />
    </div>
  ),
} satisfies Story;

export const WithIcons = {
  args: {
    items: getItems({ length: 3 }),
  },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <h4>First item has icon</h4>
      <Breadcrumbs items={getItems({ length: 5, icon: CompanySpaceIcon })} />
      <h4>Every item has icon with custom styles</h4>
      <Breadcrumbs
        items={getItems({ length: 5 }).map((item) => ({
          ...item,
          icon: CompanySpaceIcon,
          iconProps: { style: { color: faker.color.human() } },
        }))}
      />
      <h4>With custom separator</h4>
      <Breadcrumbs items={getItems({ length: 5 })} separatorIcon={CloseMiddleIcon} />
    </div>
  ),
} satisfies Story;
