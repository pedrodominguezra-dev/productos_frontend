export interface QueryStateI {
  search: string;
  per_page: number;
  page: number;
}

export interface ControlTableProps {
  query: QueryStateI;
  onChange: (updates: Partial<QueryStateI>) => void;
}

export interface RowPerPageProps {
  perPage: number;
  onChange: (updates: Partial<QueryStateI>) => void;
}
