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
import type {
  ProductDataI,
  ProductI,
} from "@/services/ProductServices/ProductServiceInterface";
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
    try {
      const response = await productService.getProducts(query);
      if (response.status) {
        setProducts(response.data.data);

        setPaginationData(response.data);
        return;
      }
      setProducts([]);
      setPaginationData(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Cargando los productos...
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            ))
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
