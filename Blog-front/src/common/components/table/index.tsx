import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import clsx from 'clsx'
import React from 'react'

import { PAGE_SIZE } from '@/common/helpers/enum'

export interface TableComponentProps<T> {
  columns: ColumnsType<T>
  data: T[]
  className?: string
  loading?: boolean
  pageSize?: number
  rowKey?: string
  isShowSorterTooltip?: boolean
}

function TableComponent<T extends object>({
  columns,
  data,
  className,
  loading,
  pageSize = PAGE_SIZE,
  rowKey,
  isShowSorterTooltip = false,
  ...props
}: TableComponentProps<T>) {
  return (
    <>
      <Table
        bordered
        loading={loading}
        pagination={{ pageSize: pageSize }}
        columns={columns}
        dataSource={data}
        className={clsx('', className)}
        {...props}
        rowKey={rowKey}
        scroll={{ x: 1300 }}
        showSorterTooltip={isShowSorterTooltip}
      />

      <style jsx global>
        {`
          .ant-table {
            color: #333;
            box-shadow: 0px 2px 6.8px 0px rgba(110, 108, 108, 0.2);
            font-weight: 400;
          }

          .ant-table-thead > tr > th {
            font-weight: 700 !important;
          }
        `}
      </style>
    </>
  )
}

export default TableComponent
