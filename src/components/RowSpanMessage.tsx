import { TableCell, TableRow } from "./ui/table";
import type { RowSpanMessageProps } from "@/types/Table";

export const RowSpanMessage = ({
  children,
  className,
}: RowSpanMessageProps) => {
  return (
    <TableRow>
      <TableCell colSpan={4} className={className}>
        {children}
      </TableCell>
    </TableRow>
  );
};
