import { ColumnsWrapper } from '../StorybookUtilities';

import { Image } from './Image';

import type { ImageItem, ImageListByResolution } from './Image';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Image',
  component: Image,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} as Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

const items: ImageListByResolution = {
  1: '/images/test-image.png',
  2: '/images/test-image@2x.png',
  3: '/images/test-image@3x.png',
};

const sources: ImageItem[] = [
  {
    type: 'image/webp',
    items: {
      1: '/images/test-image.webp',
      2: '/images/test-image@2x.webp',
      3: '/images/test-image@3x.webp',
    },
  },
];

export const Default = {
  render: () => (
    <ColumnsWrapper style={{ gridTemplateColumns: 'auto 1fr 1fr' }}>
      <h4>Ratio</h4>
      <h4>PNG source</h4>
      <h4>WEBP source</h4>
      21 / 9: <Image items={items} ratio={21 / 9} /> <Image items={items} ratio={21 / 9} sources={sources} />
      16 / 9: <Image items={items} ratio={16 / 9} /> <Image items={items} ratio={16 / 9} sources={sources} />
      4 / 3: <Image items={items} ratio={4 / 3} /> <Image items={items} ratio={4 / 3} sources={sources} />
      No ratio: <Image items={items} /> <Image items={items} sources={sources} />
    </ColumnsWrapper>
  ),
} satisfies Story;
