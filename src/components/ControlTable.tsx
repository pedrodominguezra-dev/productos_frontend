import type { ControlTableProps } from "@/types/Table";
import { RowsPerPage } from "./RowsPerPage";
import { Input } from "./ui/input";

export const ControlTable = ({ query, onChange }: ControlTableProps) => {
  return (
    <div className="flex justify-between p-2 rounded">
      <div>
        <RowsPerPage perPage={query.per_page} onChange={onChange} />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Buscar producto"
          value={query.search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ search: e.target.value })
          }
        />
      </div>
    </div>
  );
};
