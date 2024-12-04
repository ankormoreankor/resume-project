import React from 'react';

import { Checkbox } from './Checkbox';

import type { CheckboxProps } from './Checkbox';
import type { StoryFn, Meta } from '@storybook/react';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof Checkbox>> = (args) => <Checkbox {...args} />;

export const Default = {
  ...Template,
  args: {
    onStateChange: (checked) => console.log('checked', checked),
  } as CheckboxProps,
};

export const Round = {
  ...Template,
  args: {
    isRound: true,
  } as CheckboxProps,
};

export const Large = {
  ...Template,
  args: {
    size: 'large',
  } as CheckboxProps,
};

export const Indeterminate = {
  ...Template,
  args: {
    checked: 'indeterminate',
  } as CheckboxProps,
};

export const WithLabel = {
  ...Template,
  args: {
    labelText: 'Lorem ipsum dolor sit amet',
    onCheckedChange: (checked) => console.log('checked', checked),
  } as CheckboxProps,
};

export const WithBigLabel = {
  ...Template,
  args: {
    labelText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam atque reprehenderit animi earum alias deserunt omnis est itaque at minima porro reiciendis aliquam exercitationem eaque labore, perferendis quibusdam ab voluptatum.',
    onCheckedChange: (checked) => console.log('checked', checked),
  } as CheckboxProps,
};

export const WithLeftLabel = {
  ...Template,
  args: {
    isWithLeftLabel: true,
    labelText: 'Lorem ipsum dolor sit amet',
  } as CheckboxProps,
};

export const WithBigLeftLabel = {
  ...Template,
  args: {
    isWithLeftLabel: true,
    labelText:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam atque reprehenderit animi earum alias deserunt omnis est itaque at minima porro reiciendis aliquam exercitationem eaque labore, perferendis quibusdam ab voluptatum.',
  } as CheckboxProps,
};
