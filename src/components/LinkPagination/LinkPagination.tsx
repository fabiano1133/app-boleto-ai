"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface LinkPaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const LinkPagination = ({
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}: LinkPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageLink = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(targetPage));
    return `${pathname}?${params.toString()}`;
  };

  const renderPageLinks = () => {
    const pages: number[] = [];

    const startPage = Math.max(1, page - 1);
    const endPage = Math.min(totalPages, page + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <>
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink asChild>
                <Link href={createPageLink(page)}></Link>
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink asChild isActive={p === page}>
              <Link href={createPageLink(p)}>{p}</Link>
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink asChild>
                <Link href={createPageLink(totalPages)}>{totalPages}</Link>
              </PaginationLink>
            </PaginationItem>
          </>
        )}
      </>
    );
  };

  return (
    <Pagination>
      <PaginationContent>
        {hasPreviousPage && (
          <PaginationItem>
            <PaginationPrevious asChild>
              <Link href={`?page=${page - 1}`}>
                <div className="flex items-center gap-1">
                  <ChevronLeftIcon />
                  <span className="hidden sm:block">Anterior</span>
                </div>
              </Link>
            </PaginationPrevious>
          </PaginationItem>
        )}

        {renderPageLinks()}

        {hasNextPage && (
          <PaginationItem>
            <PaginationNext asChild>
              <Link href={`?page=${page + 1}`}>
                <div className="flex items-center gap-1">
                  <span className="hidden sm:block">Próximo</span>
                  <ChevronRightIcon />
                </div>
              </Link>
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
