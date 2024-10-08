import React, { Fragment, useMemo, useState } from 'react'
import { Column, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getExpandedRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getSortedRowModel, Row, RowData, useReactTable } from '@tanstack/react-table'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { BiCheck } from 'react-icons/bi';
import classNames from 'classnames';
import { TextInput } from 'flowbite-react';

export interface BasicTableProps<T> {
  data: T[],
  columns: ColumnDef<T, any>[],
  expandElement?: (row: Row<T>) => React.ReactNode
}

export default function BasicTable<T>(props : BasicTableProps<T>) {

  // const helper = createColumnHelper<Test>();

  const cachedColumn = useMemo(() => props.columns, [props.columns]);
  const [cachedData, _] = useState(props.data);
  const [canExpand, __] = useState(!!props.expandElement);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const reactTable = useReactTable({
    data: cachedData,
    columns: cachedColumn,
    state: {
      columnFilters
    },
    enableColumnFilters: true,
    
    getRowCanExpand: () => canExpand,
    enableExpanding: !!props.expandElement,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel()
  });

  return (
    <div className='rounded-md relative'>
      <table className='min-h-56 rounded-md min-w-full border-2 border-slate-700'>
        <thead className='sticky top-0 bg-bluish-200 z-50'>
          {
            reactTable.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => {
                    let sortSymbol =
                      !header.column.getIsSorted() ? '⏸' : 
                        header.column.getIsSorted() === 'asc' ? '🔼' : '🔽';
                    const v = header.column.columnDef.meta?.filterVariant
                    const hasFilter = header.column.getCanFilter() && !!v;
                    return (
                      <th key={header.id} className='p-2' colSpan={header.colSpan}>
                        {
                          header.isPlaceholder ? null : <div className={classNames('flex flex-col', {
                            'min-w-32 gap-2': hasFilter
                          })}>
                            <div className='flex justify-center gap-2'>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {
                                header.column.columnDef.enableSorting && (
                                  <div title='Hold shift while clicking for multisort' className='cursor-pointer hover:bg-slate-700 rounded-sm content-center' onClick={header.column.getToggleSortingHandler()}>
                                    {sortSymbol}
                                  </div>
                                )
                              }
                            </div>
                            <div>
                              {(hasFilter) && <BasicTableFilter column={header.column}/>}
                            </div>
                          </div>
                        }
                      </th>
                    )
                  })
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            reactTable.getRowModel().rows.map(row => (
              <Fragment key={row.id}>
                <tr>
                  {
                    row.getVisibleCells().map(cell => (
                      <td key={cell.id} className={classNames('px-2 py-2', cell.column.columnDef.meta?.classes?.td ?? "", {
                        'text-center': (typeof cell.getValue() === 'number')
                      })}>
                        { cell.getIsPlaceholder() ? null : flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))
                  }
                </tr>
                {
                  ((!!props.expandElement && row.getIsExpanded()) && (
                    <tr>
                      <td colSpan={row.getVisibleCells().length}>
                        <div>
                          {props.expandElement(row)}
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </Fragment>
              
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

interface BasicTableFilterProps<T> {
  column: Column<T, any>
}

function BasicTableFilterSelect<T>(props: BasicTableFilterProps<T>)
{
  // Ambil value unique dari 1 col ini
  const uniq = props.column.getFacetedUniqueValues();

  // Ambil value yang sekarang dipilih
  const pickedValues = props.column.getFilterValue() ? props.column.getFilterValue() as (string | number)[] : [];

  // Memoize biar bisa dirender
  const uniqueValues = useMemo(() => {
    return Array.from<string | number>(uniq.keys()).sort((a, b) => a > b ? 1 : a < b ? -1 : 0)
  }, [uniq]);

  if (uniqueValues.length === 0) return (<></>);

  return (
    <Listbox value={pickedValues} multiple onChange={e => props.column.setFilterValue(e)}>
      <div className='relative'>
        <ListboxButton className='text-sm font-normal bg-gray-700 rounded-sm w-full py-1 px-2 data-[open]:ring-2 data-[open]:ring-cyan-700'>{pickedValues.length} Selected</ListboxButton>
        <ListboxOptions className={'z-50 absolute bottom-auto bg-bluish w-full rounded-md max-h-40 overflow-y-scroll scrollbar-default'}>
          {
            uniqueValues.map(x => (
              <ListboxOption className='px-2 py-1 text-left cursor-pointer' value={x} key={x}>
                <div className='hover:bg-gray-600 w-full p-1 rounded-md font-light text-sm flex gap-3'>
                  {pickedValues.includes(x) &&
                    <div className='items-center text-center flex'>
                      <BiCheck className='text-normal'/>
                    </div>
                  }
                  <span className='text-xs'>{x}</span>
                </div>
              </ListboxOption>
            ))
          }
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

function BasicTableFilterSearch<T>(props: BasicTableFilterProps<T>) {

  // Ambil value searchnya
  const inputedQuery = props.column.getFilterValue() ? props.column.getFilterValue() as string : "";

  return (
    <div>
      <input
        className='text-sm font-normal bg-gray-700 rounded-sm w-full outline-none py-1 px-2 focus:ring-2 focus:ring-cyan-700'
        value={inputedQuery}
        onChange={e => {props.column.setFilterValue(e.target.value)}}
      />
    </div>
  )
}

function BasicTableFilter<T>(props: BasicTableFilterProps<T>) {
  const filterVariant = props.column.columnDef.meta?.filterVariant;
  if (filterVariant === 'select') return (<BasicTableFilterSelect {...props}/>)
  else if (filterVariant === 'search') return (<BasicTableFilterSearch {...props}/>)
  else return (<></>)
}
