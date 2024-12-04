import { ToggleGroup } from './ToggleGroup';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Toggle Group',
  component: ToggleGroup,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof ToggleGroup>;

export default meta;

export const Default = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <div>
        Single, one selected
        <ToggleGroup
          type="single"
          items={[
            { item: 'One', value: 'one' },
            { item: 'Two', value: 'two' },
            { item: 'Three', value: 'three' },
          ]}
          defaultValue="two"
        />
      </div>
      <div>
        Multiple, two selected
        <ToggleGroup
          type="multiple"
          items={[
            { item: 'One', value: 'one' },
            { item: 'Two', value: 'two' },
            { item: 'Three', value: 'three' },
            { item: 'Four', value: 'four' },
            { item: 'Five', value: 'five' },
          ]}
          defaultValue={['two', 'four']}
        />
      </div>
      <div>
        Single, unresettable
        <ToggleGroup
          type="single"
          behavior="unresettable"
          items={[
            { item: 'One', value: 'one' },
            { item: 'Two', value: 'two' },
            { item: 'Three', value: 'three' },
            { item: 'Four', value: 'four' },
            { item: 'Five', value: 'five' },
          ]}
          defaultValue="two"
        />
      </div>
    </div>
  ),
};
