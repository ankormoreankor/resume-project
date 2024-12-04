import { BrandFileIcon } from '../icons';
import { ColumnsWrapper } from '../StorybookUtilities';

import { ActionCard } from './ActionCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Action Card',
  component: ActionCard,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof ActionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const commonProps = {
  description: "Know what you're doing and choose one of our doc types",
  children: <BrandFileIcon />,
  style: { width: '232px' },
};

export const Default = {
  render: () => (
    <ColumnsWrapper style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, width: 'fit-content' }}>
      <ActionCard {...{ ...commonProps, title: 'Default' }} />
      <ActionCard id="hovered" {...{ ...commonProps, title: 'Hovered' }} />
      <ActionCard id="focused" {...{ ...commonProps, title: 'Focused' }} />
      <ActionCard {...{ ...commonProps, title: 'Disabled' }} isDisabled />
    </ColumnsWrapper>
  ),
  parameters: { pseudo: { hover: ['#hovered'], focus: ['#focused'] } },
} satisfies Story;
