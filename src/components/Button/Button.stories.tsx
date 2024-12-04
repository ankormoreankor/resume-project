import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { StatusIcon } from '../icons';
import { Tag } from '../Tag/Tag';

import { Button } from './Button';

import type { ButtonProps, ButtonVariant } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Button',
  component: Button,
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const getCommonProps = (variant: ButtonVariant): Partial<ButtonProps> => ({
  children: 'Hedgehog',
  icon: StatusIcon,
  variant,
  onClick: () => alert('Button clicked'),
});

const rowData: ButtonProps[] = [
  {
    state: {},
  },
  {
    debugProps: {
      state: {
        isHovered: true,
      },
    },
  },
  {
    debugProps: {
      state: {
        isFocused: true,
      },
    },
  },
  {
    debugProps: {
      state: {
        isActive: true,
      },
    },
  },
  {
    state: {
      isDisabled: true,
    },
  },
  {
    state: {
      isLoading: true,
    },
  },
];

const getColumnData = (variant: ButtonVariant): ButtonProps[] => [
  {
    ...getCommonProps(variant),
    size: 'large',
  },
  {
    ...getCommonProps(variant),
    size: 'medium',
  },
  {
    ...getCommonProps(variant),
    size: 'small',
  },
  {
    ...getCommonProps(variant),
    size: 'xSmall',
  },
  {
    ...getCommonProps(variant),
    size: 'tiny',
  },
];

const states = ['Default', 'Hovered', 'Focused', 'Pressed', 'Disabled', 'Loading'];

const ButtonComponents = ({ variant }: { variant: ButtonVariant }) => (
  <div
    style={{
      display: 'grid',
      gap: 32,
      gridTemplateColumns: 'auto auto auto',
      width: 'fit-content',
      padding: 16,
    }}
  >
    {rowData.map((stateProps, index) => (
      // eslint-disable-next-line react/jsx-key
      <div style={{ display: 'grid', gap: 16, background: '#fcfcfc', padding: 16, borderRadius: 8 }}>
        <h2>{states[index]}</h2>
        {getColumnData(variant).map(({ children, icon, size, ...props }) => (
          <div key={size} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Button size={size} {...props} {...stateProps}>
              {children}
            </Button>
            <Button size={size} icon={icon} {...props} {...stateProps}>
              {children}
            </Button>
            <Button size={size} icon={icon} iconProps={{ placement: 'right' }} {...props} {...stateProps}>
              {children}
            </Button>
            <Button size={size} icon={icon} {...props} {...stateProps} />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const Primary = {
  render: () => <ButtonComponents variant="primary" />,
} satisfies Story;

export const Secondary = {
  render: () => <ButtonComponents variant="secondary" />,
} satisfies Story;

export const Tertiary = {
  render: () => <ButtonComponents variant="tertiary" />,
} satisfies Story;

export const Bordered = {
  render: () => <ButtonComponents variant="bordered" />,
} satisfies Story;

export const Transparent = {
  render: () => <ButtonComponents variant="transparent" />,
} satisfies Story;

export const Destructive = {
  render: () => <ButtonComponents variant="destructive" />,
} satisfies Story;

export const Link = {
  render: () => <ButtonComponents variant="link" />,
} satisfies Story;

export const WithCustomContentAtStartPosition = {
  args: { startContent: <Avatar size={16} />, children: 'Hedgehog' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 20 }}>
      <Button {...getCommonProps('primary')} startContent={<Avatar size={16} />} />
      <Button {...getCommonProps('secondary')} startContent={<Badge type="errorFilled">Badge</Badge>} />
      <Button {...getCommonProps('bordered')} startContent={<Tag id="1">Tag</Tag>} />
    </div>
  ),
} satisfies Story;
