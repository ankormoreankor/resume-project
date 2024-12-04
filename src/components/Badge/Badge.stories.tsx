import { Badge, badgeSize, badgeType } from './Badge';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Badge',
  component: Badge,
} as Meta<typeof Badge>;

export default meta;

export const Badges = {
  render: () => (
    <div style={{ display: 'grid', gap: '8px' }}>
      {Object.values(badgeType).map((type) => (
        <div key={type} style={{ display: 'flex', gap: '8px' }}>
          {Object.values(badgeSize).map((size) => (
            <Badge key={size} type={type} size={size}>
              Quantitative
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};
