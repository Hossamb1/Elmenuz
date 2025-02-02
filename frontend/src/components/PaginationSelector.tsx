import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              size="default"
              href="#"
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}
        {pageNumbers.map((number) => (
          <PaginationItem key={number * Math.random()}>
            <PaginationLink
              size="default"
              href="#"
              onClick={() => onPageChange(number)}
              isActive={page === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < pageNumbers.length && (
          <PaginationItem>
            <PaginationNext
              size="default"
              href="#"
              onClick={() => onPageChange(page + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;
