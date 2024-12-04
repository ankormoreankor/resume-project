import { Tabs } from './Tabs';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Tabs',
  component: Tabs,
} as Meta<typeof Tabs>;

export default meta;

type TabsIds = 'tab1' | 'tab2';

type TabsDateInterval = {
  id: TabsIds;
  label: string;
}[];

const tabs: TabsDateInterval = [
  {
    id: 'tab1',
    label: 'Monthly',
  },
  {
    id: 'tab2',
    label: 'Yearly',
  },
];

export const TabsExample = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ width: '193px' }}>
        <Tabs size="small" items={tabs} onValueChange={(value) => console.log(value)} />
      </div>

      <div style={{ width: '340px' }}>
        <Tabs size="medium" items={tabs} onValueChange={(value) => console.log(value)} />
      </div>
    </div>
  ),
};
