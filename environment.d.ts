declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES: string,
      NEXT_PUBLIC_API: string
    }
  }
}

//allows us to define custom properties for our columns
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'range' | 'select' | 'search',
  }
}

export {}