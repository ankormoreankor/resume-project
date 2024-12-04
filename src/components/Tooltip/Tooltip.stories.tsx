import { Tooltip } from './Tooltip';

import type { TooltipProps } from './Tooltip';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Tooltip',
  component: Tooltip,
  decorators: [(story) => <div style={{ width: 1200, height: 1000, padding: 20 }}>{story()}</div>],
  parameters: { chromatic: { viewports: [1200], delay: 1000, pauseAnimationAtEnd: true } },
} as Meta<typeof Tooltip>;

export default meta;

const getProps = (side: 'top' | 'right' | 'bottom' | 'left'): TooltipProps => ({
  children: <span>hello</span>,
  controlProps: { open: true },
  contentProps: { align: 'center', side },
  content: <span>tooltip content</span>,
});

export const Default = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '50%',
        width: '50%',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <Tooltip {...getProps('bottom')} />
      <Tooltip {...getProps('left')} />
      <Tooltip {...getProps('right')} />
      <Tooltip {...getProps('top')} />
    </div>
  ),
};
