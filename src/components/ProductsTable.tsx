import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { QueryStateI } from "@/types/Table";
import { useState } from "react";
import { ControlTable } from "./ControlTable";
import { PaginationTable } from "./PaginationTable";
export const ProductsTable = () => {
  const [query, setQuery] = useState<QueryStateI>({
    search: "",
    per_page: 10,
    page: 1,
  });

  const handleChangeControl = (updates: Partial<QueryStateI>) => {
    setQuery((prev) => ({
      ...prev,
      ...updates,
      page: updates.page ? updates.page : 1,
    }));
  };

  return (
    <div className="p-4">
      <ControlTable 
        query={query}
        onChange={handleChangeControl}      
      />

      <Table className="mt-4">
        <TableHeader>
          <TableRow className="bg-gray-100 rounded">
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <PaginationTable />
    </div>
  );
};
