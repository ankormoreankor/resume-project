import { faker } from '@faker-js/faker';
import React from 'react';

import { Table as TableComponent } from './Table';

import type { TableProps } from './Table';
import type { StoryFn, Meta } from '@storybook/react';

export default {
  title: 'Table',
  component: TableComponent,
} as Meta;

const TableTemplate: StoryFn<React.ComponentProps<typeof TableComponent>> = (args) => <TableComponent {...args} />;

faker.seed(500);

const data = Array.from({ length: 100 }).map(() => ({
  id: faker.string.uuid(),
  docType: faker.helpers.shuffle([
    'Note',
    'Task',
    'Survey',
    'Wiki',
    'Whiteboard',
    'Time Tracking',
    'Folder',
    'Really long doc name',
  ])[0],
  title: faker.helpers.shuffle([
    'Design',
    'Organized eco',
    'Some really long doc name',
    'Assimilated 6th',
    '🫶🤲👐🙌👏🤝👍👎👊✊🤛🤜🤞✌️🫰🤟🤘👌🤌🤏',
    '11010100101001001011',
    'Multi-passport',
    'Marketing & Sales',
    'Human Resources',
  ])[0],
  createdBy: `${faker.person.firstName()} ${faker.person.lastName()}`,
}));

const columns = [
  {
    accessorKey: 'docType',
    header: 'Doc Type',
  },
  {
    accessorKey: 'title',
    header: 'Column 2',
  },
  {
    accessorKey: 'createdBy',
    header: 'Column 3',
  },
];

export const Table = {
  ...TableTemplate,
  args: {
    data,
    isSelectable: true,
    tableHeight: 500,
    rowAddProps: { onRowAdd: () => alert('Add row button clicked') },
    columnAddProps: { onColumnAdd: () => alert('Add column button clicked') },
    columns,
    fixedColumnsNumber: 0,
    onRowSelect: (ids) => console.log(`Rows selected: `, ids),
  } as TableProps<Record<string, string>>,
};
