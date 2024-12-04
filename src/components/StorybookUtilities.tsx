import type { HTMLAttributes } from 'react';

export const ColumnsWrapper = ({ children, style }: HTMLAttributes<HTMLDivElement>) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, ...style }}>{children}</div>
);
