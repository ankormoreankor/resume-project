import { ColumnsWrapper } from '../StorybookUtilities';

import { Divider } from './Divider';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Divider',
  component: Divider,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <ColumnsWrapper>
      Line Default: <Divider />
      With text: <Divider text="or" />
      Dashed: <Divider variant="dashed" />
      Vertical: <Divider orientation="vertical" />
      Vertical with text:{' '}
      <div style={{ height: 100 }}>
        <Divider orientation="vertical" text="or" />
      </div>
    </ColumnsWrapper>
  ),
} satisfies Story;
