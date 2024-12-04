import { AttachmentIcon } from '../icons';

import { Tag } from './Tag';

import type { TagProps } from './Tag';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'Tag',
  component: Tag,
  decorators: [(story) => <div style={{ padding: 20 }}>{story()}</div>],
} satisfies Meta<typeof Tag>;

export default meta;

const Tags = ({ title, ...props }: TagProps & { title: string }) => (
  <div style={{ display: 'grid', gap: 8 }}>
    <span>{title}</span>
    <Tag size="small" {...props}>
      Attachments
    </Tag>
    <Tag size="medium" {...props}>
      Attachments
    </Tag>
  </div>
);

const tooltipContent = [
  { id: '1', icon: <AttachmentIcon />, text: 'Attachments' },
  { id: '2', icon: <AttachmentIcon />, text: 'Attachments' },
];

export const Default = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tags title="Default" />
      <Tags title="With icon" leftContent={<AttachmentIcon />} />
      <Tags title="Filled" leftContent={<AttachmentIcon />} isFilled />
      <Tags title="Hoverable" leftContent={<AttachmentIcon />} isHoverable />
      <Tags title="With Tooltip" leftContent={<AttachmentIcon />} tooltipContent={tooltipContent} />
      <Tags title="Deleted" leftContent={<AttachmentIcon />} state={{ isDeleted: true }} />
      <Tags title="Disabled" leftContent={<AttachmentIcon />} state={{ isDisabled: true }} />
      <Tags title="Deletable" onDelete={() => console.log('delete button clicked')} />
      <Tags title="Deletable" isFilled onDelete={() => console.log('delete button clicked')} />
      <Tags title="Editable" onEdit={() => console.log('edit button clicked')} />
      <Tags title="Editable" isFilled onEdit={() => console.log('edit button clicked')} />
      <Tags
        title="Editable & Deletable"
        onDelete={() => console.log('delete button clicked')}
        onEdit={() => console.log('edit button clicked')}
      />
      <Tags
        title="Editable & Deletable"
        isFilled
        onDelete={() => console.log('delete button clicked')}
        onEdit={() => console.log('edit button clicked')}
      />
    </div>
  ),
};
