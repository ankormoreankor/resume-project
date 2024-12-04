import * as VisuallyHiddenRadix from '@radix-ui/react-visually-hidden';

import type { PropsWithChildren } from 'react';

export const VisuallyHidden = ({ children }: PropsWithChildren) => (
  <VisuallyHiddenRadix.Root> {children}</VisuallyHiddenRadix.Root>
);
