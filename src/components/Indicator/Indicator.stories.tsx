import { Indicator } from './Indicator';

import type { IndicatorProps } from './Indicator';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Indicator',
  component: Indicator,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof Indicator>;

export default meta;

type Story = StoryObj<typeof meta>;

const IndicatorTemplate = ({ count, maxCount }: IndicatorProps) => (
  <div>
    <h6>
      Current count - {count}, max count - {maxCount}
    </h6>
    <div style={{ display: 'flex', gap: 8 }}>
      <Indicator {...{ count, maxCount }} />
      <Indicator size="small" {...{ count, maxCount }} />
      <Indicator size="tiny" {...{ count, maxCount }} />
    </div>
  </div>
);

export const Default = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <IndicatorTemplate count={1} maxCount={100} />
      <IndicatorTemplate count={20} maxCount={100} />
      <IndicatorTemplate count={15} maxCount={9} />
      <IndicatorTemplate count={100} maxCount={99} />
      <IndicatorTemplate count={30} maxCount={25} />
    </div>
  ),
} satisfies Story;
