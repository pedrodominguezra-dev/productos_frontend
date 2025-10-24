import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { PaginationProps } from "@/types/Table";
import { Separator } from "./ui/separator";
export const PaginationTable = ({
  paginationData,
  query,
  onChange,
}: PaginationProps) => {
  const [firstLink, ...rest] = paginationData?.links || [];
  const lastLink = rest.pop();

  return (
    <>
    <Separator />
    <Pagination className="mt-3">
      <PaginationContent>
        {paginationData?.links.map((link, i) => (
          <PaginationItem key={i}>
            {link.label === "..." ? (
              <PaginationEllipsis />
            ) : (
              <>
                {firstLink.label === link.label ? (
                  <PaginationPrevious
                    isActive={query.page > 1} 
                    onClick={(e) => {
                      e.preventDefault();
                      if (query.page > 1) onChange({ page: query.page - 1 });
                    }}
                  />
                ) : (
                  <>
                    {lastLink?.label === link.label ? (
                      <PaginationNext
                        isActive={query.page < (paginationData?.last_page || 1)}            
                        onClick={(e) => {
                          e.preventDefault();
                          if (query.page < (paginationData?.last_page || 1))
                            onChange({ page: query.page + 1 });
                        }}
                      />
                    ) : (
                      <PaginationLink
                        href="#"
                        className={link.active ? "bg-gray-200" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          onChange({ page: Number(link.label) });
                        }}
                      >
                        {link.label}
                      </PaginationLink>
                    )}
                  </>
                )}
              </>
            )}
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
    </>
  );
};
