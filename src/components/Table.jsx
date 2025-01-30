import React from 'react'

/**
 * @typedef {Object} TableProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/**
 * @param {TableProps & React.TableHTMLAttributes<HTMLTableElement>} props
 */
export const Table = ({ children, className, ...props }) => {
  return (
    <table className={`w-full border-collapse ${className || ''}`} {...props}>
      {children}
    </table>
  )
}

/**
 * @typedef {Object} TableBodyProps
 * @property {React.ReactNode} children
 */

/**
 * @param {TableBodyProps & React.HTMLAttributes<HTMLTableSectionElement>} props
 */
export const TableBody = ({ children, ...props }) => {
  return <tbody {...props}>{children}</tbody>
}

/**
 * @typedef {Object} TableRowProps
 * @property {React.ReactNode} children
 */

/**
 * @param {TableRowProps & React.HTMLAttributes<HTMLTableRowElement>} props
 */
export const TableRow = ({ children, ...props }) => {
  return <tr {...props}>{children}</tr>
}

/**
 * @typedef {Object} TableCellProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/**
 * @param {TableCellProps & React.TdHTMLAttributes<HTMLTableCellElement>} props
 */
export const TableCell = ({ children, className, ...props }) => {
  return (
    <td className={`p-2 ${className || ''}`} {...props}>
      {children}
    </td>
  )
}