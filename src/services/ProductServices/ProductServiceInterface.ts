export interface ProductI {
  id: number;
  name: string;
  description: string;
  price: number;
  created_at : Date,
  updated_at : Date
}

export interface LinkTableI{
 url : string | null,
        label : string,
        active: boolean
}


export interface DataTableI { 
    current_page : number,
    first_page_url : string,
    from : number,
    last_page : number,
    last_page_url : string,
    links: LinkTableI[],
    next_page_url : string | null,
    path : string,
    per_page: number,
    prev_page_url : string | null,
    to : number,
    total: number
}

export interface ResponseI {
    message : string,
    status : boolean
}

export interface ProductDataI extends DataTableI {
    data : ProductI[],
}

export interface GetProductsSuccess extends ResponseI, ProductDataI{}


export type getProductsResponseT = | GetProductsSuccess | ResponseI