import type { ControlTableProps } from "@/types/Table";
import { RowsPerPage } from "./RowsPerPage";
import { Input } from "./ui/input";
import { useCallback, useEffect, useState } from "react";

export const ControlTable = ({ query, onChange }: ControlTableProps) => {
  const [searchTerm, setSearchTerm] = useState(query.search);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchChange = useCallback(() => {
    if (searchTerm !== query.search) {
      onChange({ search: searchTerm, page: 1 });
    }
  }, [searchTerm, query.search, onChange]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearchChange();
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [handleSearchChange]);

  return (
    <div className="flex justify-between p-2 rounded">
      <div>
        <RowsPerPage perPage={query.perPage} onChange={onChange} />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Search product ..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
