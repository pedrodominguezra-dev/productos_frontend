import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { QueryStateI } from "@/types/Table";
import { useEffect, useState } from "react";
import { ControlTable } from "./ControlTable";
import { PaginationTable } from "./PaginationTable";
import { ProductService } from "@/services/ProductServices/ProductService";
import {
  isGetProductsSuccess,
  type ProductDataI,
  type ProductI,
} from "@/services/ProductServices/ProductServiceInterface";
import { RowSpanMessage } from "./RowSpanMessage";
export const ProductsTable = () => {
  const [query, setQuery] = useState<QueryStateI>({
    search: "",
    perPage: 10,
    page: 1,
  });

  const [products, setProducts] = useState<ProductI[]>([]);
  const [paginationData, setPaginationData] = useState<ProductDataI | null>(
    null
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Instancia del servicio de productos
  const productService = ProductService.getInstance();

  // Cuando cambie los valores de row per page and
  const handleChangeControl = (updates: Partial<QueryStateI>) => {
    setQuery((prev) => ({
      ...prev,
      ...updates,
      page: updates.page ? updates.page : 1,
    }));
  };

  const fetchProducs = async () => {
    setIsLoading(true);
    setError(null);

    const response = await productService.getProducts(query);
    
    if (isGetProductsSuccess(response)) {
      setProducts(response.data.data); 
      setPaginationData(response.data); 
    } else {
      setProducts([]);
      setPaginationData(null);
      setError(response.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducs();
  }, [query]);


  return (
    <div className="p-4">
      <ControlTable query={query} onChange={handleChangeControl} />

      <Table className="mt-4">
        <TableHeader>
          <TableRow className="bg-gray-100 rounded">
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {error && (
            <RowSpanMessage className="text-center text-red-500">
              {error}
            </RowSpanMessage>
          )}
          {isLoading && (
            <RowSpanMessage className="text-center">
              Cargando resultados ...
            </RowSpanMessage>
          )}

          {!error && !isLoading && products && products.length > 0 && (
            <>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
              ))}
            </>
          )}

          {!error && !isLoading && products.length === 0 && (
            <RowSpanMessage className="text-center">
              No se encontraron productos
            </RowSpanMessage>
          )}
        </TableBody>
      </Table>
      {paginationData && !isLoading && (
        <PaginationTable
          paginationData={paginationData}
          query={query}
          onChange={handleChangeControl}
        />
      )}
    </div>
  );
};
