import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import classNames from 'classnames';
import { useState, forwardRef, isValidElement, useMemo, useEffect } from 'react';
import { TableVirtuoso } from 'react-virtuoso';

import utility from '../../scss/utility.module.scss';
import { Checkbox } from '../Checkbox/Checkbox';
import { ArrowDownLightIcon, PlusIcon } from '../icons';
import { Tooltip } from '../Tooltip/Tooltip';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';

import scss from './Table.module.scss';

import type { CheckboxProps } from '../Checkbox/Checkbox';
import type { TooltipProps } from '../Tooltip/Tooltip';
import type { ColumnDef, SortDirection, SortingState } from '@tanstack/react-table';
import type { PropsWithChildren } from 'react';

type TableHeaderProps = PropsWithChildren<{ className?: string }>;

export const TableHeader = ({ children, className }: TableHeaderProps) => (
  <span className={classNames(scss.tHeader, className)}>{children}</span>
);

const TableCheckbox = ({
  checked,
  indeterminate,
  onChange,
  ...rest
}: {
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (event: unknown) => void;
} & CheckboxProps) => (
  <Checkbox
    {...{
      className: scss.checkbox,
      checked: indeterminate ? 'indeterminate' : checked,
      ...rest,
      onStateChange: (value: CheckboxProps['checked']) => onChange?.({ target: { checked: value } }),
    }}
  />
);

type RowData = Record<string, unknown> & { id?: string };

export interface TableProps<TData extends RowData> {
  /**
   * Custom class name for the root component
   */
  className?: string;
  /**
   * Table data
   */
  data: TData[];
  /**
   * Columns data with headers, used as a schema to render columns
   */
  columns: ColumnDef<TData, unknown>[];
  /**
   * This is a requirement from Virtuoso: without a value, table won't be visible (height: 0)
   */
  tableHeight: number | string;
  /**
   * If true, table cells are selectable
   * @default false
   */
  isSelectable?: boolean;
  /**
   * If true, table is sortable
   * @default false
   */
  isSortable?: boolean;
  onRowSelect?: (rowsIds: string[]) => void;
  /**
   * Number of columns which will be fixed on the left side of the table
   * @default 0
   */
  fixedColumnsNumber?: 0 | 1 | 2;
  /**
   * Props for the column add button
   */
  columnAddProps?: {
    /**
     * Callback for adding a column to the table
     */
    onColumnAdd?: () => void;
    /**
     * Tooltip props for the column add button
     */
    tooltipProps?: TooltipProps;
  };
  /**
   * Props for the row add button
   */
  rowAddProps?: {
    /**
     * Callback for adding a row to the table
     */
    onRowAdd?: () => void;
    /**
     * Tooltip props for the row add button
     */
    tooltipProps?: TooltipProps;
  };

  /**
   * If true, last empty column will be rendered
   * @default true
   */
  isHasLastColumn?: boolean;
  /**
   * Any data-* prop you need
   */
  [key: `data-${string}`]: string | undefined;
}

export const Table = <TData extends RowData>({
  data: dataProp,
  columns: columnsProp,
  className,
  tableHeight,
  fixedColumnsNumber = 0,

  isSortable = false,
  isSelectable = false,
  isHasLastColumn = true,

  onRowSelect,

  columnAddProps: { onColumnAdd, tooltipProps: columnAddTooltipProps = {} } = {},
  rowAddProps: { onRowAdd, tooltipProps: rowAddTooltipProps = {} } = {},
  ...dataProps
}: TableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const isWithAddColumnButton = onColumnAdd !== undefined;

  const lastColumn = { accessorKey: 'lastColumn', header: () => <PlusIcon /> };

  const columns = useMemo(() => columnsProp, [columnsProp]);
  const data = useMemo(() => dataProp, [dataProp]);

  const table = useReactTable({
    data,
    columns: isHasLastColumn ? [...columns, lastColumn] : columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const isFirstColumnFixed = fixedColumnsNumber >= 1;
  const isSecondColumnFixed = fixedColumnsNumber >= 2;
  const selectedRowsIds = rows
    .filter((row) => row.getIsSelected())
    .map((row) => {
      if (!row.original.id) {
        throw new Error('Row id is not provided');
      }

      return row.original.id;
    });

  useEffect(() => {
    if (!onRowSelect || !table || !rows || rows.length === 0) return;

    onRowSelect(selectedRowsIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRowSelect, rows, selectedRowsIds.length, table]);

  return (
    <div className={classNames(scss.tableRoot, className)} data-element="table" {...dataProps}>
      <TableVirtuoso
        style={{ height: tableHeight }}
        totalCount={rows.length}
        components={{
          Table: (props) => (
            <div {...props} className={classNames(scss.table, isSelectable && scss.isSelectable)} data-table-node="table" />
          ),
          // eslint-disable-next-line react/display-name
          TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
            <div {...props} className={scss.tableBody} ref={ref} data-table-node="tbody" />
          )),
          TableRow: (props) => <div {...props} className={scss.tr} data-table-node="tr" data-element="table-row" />,
          // eslint-disable-next-line react/display-name
          TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
            <div {...props} className={scss.thead} ref={ref} data-table-node="thead" />
          )),
          // eslint-disable-next-line react/display-name
          TableFoot: forwardRef<HTMLTableSectionElement>((props, ref) => {
            if (onRowAdd === undefined) return null;
            return <div {...props} className={scss.tfoot} ref={ref} data-table-node="tfoot" />;
          }),
        }}
        fixedHeaderContent={() =>
          table.getHeaderGroups().map((headerGroup) => (
            <>
              {headerGroup.headers.map((header, index) => {
                const columnSortedValue: false | SortDirection = header.column.getIsSorted();
                const isLastColumn = index === headerGroup.headers.length - 1;
                const isToRenderAddColumnButton = isWithAddColumnButton && isLastColumn;

                const title = flexRender(header.column.columnDef.header, header.getContext());

                return (
                  <div
                    className={classNames(
                      scss.th,
                      isFirstColumnFixed && scss.isFirstColumnFixed,
                      isSecondColumnFixed && scss.isSecondColumnFixed,
                    )}
                    key={header.id}
                    data-table-node="th"
                    data-column-id={header.column.id}
                  >
                    {index === 0 && isSelectable && (
                      <TableCheckbox
                        {...{
                          checked: table.getIsAllRowsSelected(),
                          indeterminate: table.getIsSomeRowsSelected(),
                          onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                      />
                    )}
                    {!isLastColumn && isSortable && (
                      <button
                        {...{
                          type: 'button',
                          onClick: header.column.getToggleSortingHandler(),
                          className: classNames(
                            utility.buttonReset,
                            scss.thContent,
                            header.column.getCanSort() && scss.withArrow,
                          ),
                        }}
                      >
                        {title}
                        {columnSortedValue === 'asc' && <ArrowDownLightIcon className={scss.arrowUp} />}
                        {columnSortedValue === 'desc' && <ArrowDownLightIcon />}
                      </button>
                    )}
                    {!isLastColumn && !isSortable && (
                      <span className={scss.thContent} title={typeof title === 'string' ? title : ''}>
                        {title}
                      </span>
                    )}
                    {isToRenderAddColumnButton && (
                      <Tooltip {...columnAddTooltipProps}>
                        <button
                          type="button"
                          className={classNames(utility.buttonReset, scss.thContent, scss.addButton)}
                          data-table-node="add-column-button"
                          onClick={onColumnAdd}
                        >
                          {title}
                        </button>
                      </Tooltip>
                    )}
                  </div>
                );
              })}
            </>
          ))
        }
        itemContent={(index) => {
          const row = rows[index];

          if (!row) return null;

          return row.getVisibleCells().map((cell, cellIndex) => {
            const sellContent = cell.renderValue();

            const isFirstCellSelectable = isSelectable && cellIndex === 0;
            const isValidReactNode = isValidElement(sellContent) || typeof sellContent === 'string';
            const cellClassName = classNames(utility.ellipsis, scss.sellContent);

            return (
              <div
                key={cell.id}
                className={classNames(
                  scss.td,
                  isFirstColumnFixed && scss.isFirstColumnFixed,
                  isSecondColumnFixed && scss.isSecondColumnFixed,
                )}
                data-table-node="td"
                data-column-id={cell.column.id}
                data-row-id={cell.row.original?.id}
              >
                {isFirstCellSelectable && (
                  <TableCheckbox
                    className={classNames(cellClassName, scss.checkbox)}
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                  />
                )}

                {isValidReactNode && (
                  <span
                    className={cellClassName}
                    data-table-node="cell-content"
                    title={typeof sellContent === 'string' ? sellContent : ''}
                  >
                    {sellContent}
                  </span>
                )}
              </div>
            );
          });
        }}
        fixedFooterContent={() =>
          table.getFooterGroups().map((footerGroup) =>
            footerGroup.headers.map((footer, index) => {
              if (index === 0)
                return (
                  <div key={footer.id} className={scss.td}>
                    <Tooltip {...rowAddTooltipProps}>
                      <button
                        type="button"
                        className={classNames(utility.buttonReset, scss.addButton)}
                        data-table-node="add-row-button"
                        onClick={onRowAdd}
                      >
                        <VisuallyHidden>Add row</VisuallyHidden>
                        <PlusIcon />
                      </button>
                    </Tooltip>
                  </div>
                );

              return <div key={footer.id} className={scss.td} />;
            }),
          )
        }
      />
    </div>
  );
};
