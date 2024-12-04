import { Avatar } from './Avatar';

import type { Meta, StoryFn, StoryObj } from '@storybook/react';

const AVATAR_SIZES = [10, 12, 16, 18, 20, 24, 32, 40, 48, 56, 64];

const meta = {
  title: 'Avatar',
  component: Avatar,
} as Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const icon =
  'https://companies-public-dev.s3.us-west-2.amazonaws.com/companies/cliis32cu0000l708gm2j3a65/files/888b2e17-d84b-4548-bce0-8eba8e8ce328_5cd632f2-23cf-42c0-b7b2-ecd1d6df1b78.jpg';

const whiteAvatar = 'https://i.kym-cdn.com/photos/images/newsfeed/000/082/456/Okay.png';

const AvatarTemplate: StoryFn<React.ComponentProps<typeof Avatar>> = (args) => <Avatar {...args} />;

export const Default = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {AVATAR_SIZES.map((size) => (
        <AvatarTemplate key={size} size={size} name="Avatar Name" />
      ))}
    </div>
  ),
} satisfies Story;

export const WithAvatars = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {AVATAR_SIZES.map((size) => (
        <AvatarTemplate key={size} size={size} name="Avatar Name" src={icon} />
      ))}
    </div>
  ),
} satisfies Story;

export const WithBorderedAvatars = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {AVATAR_SIZES.map((size) => (
        <AvatarTemplate key={size} size={size} name="Avatar Name" src={whiteAvatar} isBordered />
      ))}
    </div>
  ),
} satisfies Story;
