export interface ProductI {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface LinkTableI {
  url: string | null;
  label: string;
  active: boolean;
}

export interface DataTableI {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinkTableI[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Respuesta de error
export interface ErrorResponseI {
  message: string;
  status: false;
}

// Respuesta exitosa - data es obligatorio
export interface SuccessResponseI<T = unknown> {
  message: string;
  status: true;
  data: T; // Cambiado de opcional a obligatorio
}

// Para productos con paginación
export interface ProductDataI extends DataTableI {
  data: ProductI[];
}

export type GetProductsSuccess = SuccessResponseI<ProductDataI>;

// Tipo unión para la respuesta
export type GetProductsResponseT = GetProductsSuccess | ErrorResponseI;
export function isGetProductsSuccess(
  res: GetProductsResponseT
): res is GetProductsSuccess {
  return (
    res.status === true &&
    "data" in res &&
    res.data !== undefined &&
    "data" in res.data &&
    Array.isArray(res.data.data)
  );
}
