import React from 'react';
import styles from './TableView.module.css';

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableViewProps {
  columns: TableColumn[];
  rows: Record<string, string>[];
}

export default function TableView({ columns, rows }: TableViewProps) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {columns.map(col => (
            <th key={col.key} className={styles.th}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={styles.tr}>
            {columns.map(col => (
              <td key={col.key} className={styles.td}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
} 