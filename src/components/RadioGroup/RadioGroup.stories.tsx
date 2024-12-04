import { RadioGroup } from './RadioGroup';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'RadioGroup',
  component: RadioGroup,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultValue = 'Option_1';
const simpleItems = [{ value: defaultValue }, { value: 'Option_2' }, { value: 'Option_3' }];
const labeledItems = [
  { value: defaultValue, label: 'Option 1' },
  { value: 'Option_2', label: 'Option 2' },
  { value: 'Option_3', label: 'Option 3' },
];

export const Default = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'auto 1fr' }}>
      Large: <RadioGroup items={simpleItems} defaultValue={defaultValue} />
      Large with labels:{' '}
      <RadioGroup
        items={[...labeledItems, { value: 'Option_4', label: 'Option 4', id: 'focused' }]}
        defaultValue={defaultValue}
      />
      Small: <RadioGroup items={simpleItems} size="small" defaultValue={defaultValue} />
      Small with labels:{' '}
      <RadioGroup
        items={[...labeledItems, { value: 'Option_4', label: 'Option 4', id: 'focused' }]}
        size="small"
        defaultValue={defaultValue}
      />
      Large, one button disabled:{' '}
      <RadioGroup items={[...simpleItems, { value: 'Option_4', isDisabled: true }]} defaultValue="Option_4" />
      Small, all group disabled:{' '}
      <RadioGroup
        items={[{ value: defaultValue }, { value: 'Option_2' }, { value: 'Option_3' }]}
        isDisabled
        defaultValue={defaultValue}
        size="small"
      />
    </div>
  ),
  parameters: { pseudo: { focus: ['#focused'] } },
} satisfies Story;
