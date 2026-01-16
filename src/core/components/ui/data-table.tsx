import * as React from 'react'
import { cn } from '@/core/lib/utils'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/core/components/ui/table'

export type DataTableColumn<T> = {
  key: string
  header: React.ReactNode
  headerClassName?: string
  cellClassName?: string
  render: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  isLoading?: boolean
  loadingContent?: React.ReactNode
  emptyContent?: React.ReactNode
  className?: string
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  loadingContent,
  emptyContent,
  className,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className={cn('p-6 text-center', className)}>
        {loadingContent ?? (
          <>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#007DC6]/30 border-t-[#007DC6]" />
            <p className="mt-2 text-sm text-gray-500">Loading…</p>
          </>
        )}
      </div>
    )
  }

  if (!data.length && emptyContent) {
    return <div className={className}>{emptyContent}</div>
  }

  return (
    <Table className={cn('bg-white', className)}>
      <TableHeader className="bg-gray-50">
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={cn('text-xs font-medium text-[#667085]', col.headerClassName)}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className="border-b border-[#F2F4F7]">
            {columns.map((col) => (
              <TableCell
                key={col.key}
                className={cn('text-sm text-[#344054]', col.cellClassName)}
              >
                {col.render(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


