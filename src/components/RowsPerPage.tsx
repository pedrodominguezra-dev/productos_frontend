import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import type { RowPerPageProps } from "@/types/Table";

const rowsCount = [5, 10, 15, 20];

export const RowsPerPage = ({perPage, onChange} : RowPerPageProps) => {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Label htmlFor="rows-per-page" className="text-sm font-medium">
        Rows per page
      </Label>
      <Select 
        value={`${perPage}`}  
        onValueChange={(value: string) => onChange({perPage : Number(value)})}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`10`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {rowsCount.map((row : number) => (
              <SelectItem key={row} value={`${row}`}>{row}</SelectItem>
            ))}
            
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
