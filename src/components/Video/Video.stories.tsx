import { ColumnsWrapper } from '../StorybookUtilities';

import { Video } from './Video';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Video',
  component: Video,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof Video>;

export default meta;

type Story = StoryObj<typeof meta>;

const sources = [
  {
    type: 'video/webm',
    src: '/videos/neo_stops_bullets.webm',
  },
  {
    type: 'video/mp4',
    src: '/videos/neo_stops_bullets.mp4',
  },
];

export const Default = {
  render: () => (
    <ColumnsWrapper>
      With autoplay and loop: <Video loop autoPlay defaultSource="/videos/neo_stops_bullets.mp4" sources={sources} />
      With default controls: <Video controls defaultSource="/videos/neo_stops_bullets.mp4" sources={sources} />
    </ColumnsWrapper>
  ),
} satisfies Story;
