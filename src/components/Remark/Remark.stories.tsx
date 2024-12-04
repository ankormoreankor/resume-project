import { faker } from '@faker-js/faker';

import { PenIcon } from '../icons';

import { Remark } from './Remark';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Remark',
  component: Remark,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof Remark>;

export default meta;

type Story = StoryObj<typeof meta>;

faker.seed(123);

export const Default = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'auto 1fr' }}>
      Default:{' '}
      <Remark text="Your personal templates are only visible to you. Heres a breakdown of your saves templates per apps." />
      Without text: <Remark text="" />
      With custom icon: <Remark text="With custom icon" icon={PenIcon} />
      With big icon: <Remark text="With big icon" iconProps={{ size: 24 }} />
      With long text: <Remark text={faker.lorem.paragraph()} />
    </div>
  ),
} satisfies Story;
