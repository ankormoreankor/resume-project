import { faker } from '@faker-js/faker';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { IconExtended } from '../IconExtended/IconExtended';
import { TrashBinIcon } from '../icons';

import { AlertDialog } from './AlertDialog';
import scss from './AlertDialog.module.scss';

import type { AlertDialogProps } from './AlertDialog';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Alert Dialog',
  component: AlertDialog,
  chromatic: { delay: 1000, pauseAnimationAtEnd: true },
} as Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

faker.seed(123);

const defaultProps: AlertDialogProps = {
  state: { isDefaultOpen: true },
  title: 'Default title',
  description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
};

const DefaultContent = (args: AlertDialogProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  return (
    <div style={{ padding: 20, width: 800, height: 800, position: 'relative' }} ref={setContainer}>
      <AlertDialog {...args} portalProps={{ container }} contentProps={{ style: { position: 'absolute' } }} />
    </div>
  );
};

export const Default = {
  args: { ...defaultProps },
  render: (args) => <DefaultContent {...args} />,
} satisfies Story;

export const WithContentOverflow = {
  args: {
    ...defaultProps,
    title: faker.lorem.paragraphs(2),
    description: faker.lorem.paragraphs(5),
  },
  render: (args) => <DefaultContent {...args} />,
} satisfies Story;

export const WithCustomButtonStyle = {
  args: {
    ...defaultProps,
    cancelButtonProps: {
      variant: 'primary',
    },
    confirmButtonProps: {
      variant: 'secondary',
      state: {
        isDisabled: true,
      },
      icon: TrashBinIcon,
    },
  },
  render: (args) => <DefaultContent {...args} />,
} satisfies Story;

export const WithCustomContent = {
  args: {
    ...defaultProps,
    customContent: (
      <>
        <IconExtended icon={TrashBinIcon} size={200} strokeWidth={5} style={{ margin: '0 auto', color: 'grey' }} />
        <div className={scss.buttons}>
          <Button variant="primary" size="small" className={scss.button}>
            1
          </Button>
          <Button variant="secondary" size="small" className={scss.button}>
            2
          </Button>
          <Button variant="bordered" size="small" className={scss.button}>
            3
          </Button>
        </div>
      </>
    ),
  },
  render: (args) => <DefaultContent {...args} />,
} satisfies Story;

export const Wide = {
  args: {
    ...defaultProps,
    type: 'wide',
  },
  render: (args) => <DefaultContent {...args} />,
} satisfies Story;
