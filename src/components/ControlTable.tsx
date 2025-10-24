import type { ControlTableProps } from "@/types/Table";
import { RowsPerPage } from "./RowsPerPage";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

export const ControlTable = ({ query, onChange }: ControlTableProps) => {
  const [searchTerm, setSearchTerm] = useState(query.search);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {
    const delayDebounce = setTimeout(() => {      
      if (searchTerm !== query.search) {
        onChange({ search: searchTerm, page: 1 }); 
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

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
