import type { DataTableI } from "@/services/ProductServices/ProductServiceInterface";

export interface QueryStateI {
  search: string;
  perPage: number;
  page: number;
}

interface OnChangeControl {
  onChange : (updates: Partial<QueryStateI>) => void;
}
export interface ControlTableProps extends OnChangeControl {
  query: QueryStateI;
}



export interface RowPerPageProps extends OnChangeControl {
  perPage: number;
}


export interface PaginationProps extends OnChangeControl{
  paginationData : DataTableI,
  query : QueryStateI
}