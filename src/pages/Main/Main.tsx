import { searchFilms } from "@/api/search";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  Pagination,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { filmsRoute } from "@/router/router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Films as FilmsType } from "@/types/Films";
import { useNavigate } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Main = () => {
  const navigate = useNavigate({ from: filmsRoute.fullPath });
  const [currentPage, setCurrentPage] = useState(1);

  const { data: films, isFetching } = useQuery<FilmsType>({
    queryKey: ["films", { currentPage }],
    queryFn: () => searchFilms({ limit: 10, page: currentPage }),
    placeholderData: keepPreviousData,
  });

  const handlePageClick = useCallback(
    (page: number) => {
      setCurrentPage(page);
      navigate({ search: { page } });
    },
    [navigate]
  );

  const renderPagination = useCallback(() => {
    const pages = [];
    if (!films) return null;

    for (let i = 1; i <= films?.pages; i++) {
      if (i === 1 || i === films?.pages || i === currentPage || i === currentPage + 1 || i === currentPage - 1) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={i === currentPage} onClick={() => handlePageClick(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === 2 || i === films?.pages - 1) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return pages;
  }, [currentPage, films, handlePageClick]);

  return (
    <>
      {films?.docs?.length === 0 && <div className="w-full text-center">Ничего не найдено</div>}
      <div className="flex justify-between gap-y-4 flex-wrap w-[1440px] mx-auto">
        {isFetching ? (
          Array.from({ length: 10 }, (_, index) => (
            <Skeleton key={index} className="w-[256px] h-[360px] duration-500" />
          ))
        ) : (
          <>
            {films?.docs?.map((film) => (
              <Card
                key={film.id}
                onClick={() => navigate({ to: `/films/${film.id}` })}
                className="w-[256px] h-[360px] hover:scale-105 hover:shadow-md cursor-pointer transition duration-300"
              >
                <CardHeader className="h-full flex flex-col justify-between items-center px-2 py-4">
                  <div className="w-[148px] h-[200px] flex items-center justify-center">
                    {film?.poster?.previewUrl ? (
                      <img
                        src={film.poster.previewUrl}
                        className="object-cover rounded-md w-full h-full"
                        alt="poster"
                      />
                    ) : (
                      <div className="rounded-md h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                        Нет постера
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <CardTitle className="text-center">{film.name || "Без имени"}</CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                      {film.enName && `(${film.enName})`}
                    </CardDescription>
                    <CardDescription className="text-center">
                      {!!film.year && `Дата выхода: ${film.year}`}
                    </CardDescription>
                    <CardDescription className="line-clamp-2 text-center">
                      {film.description || "Нет описания"}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </>
        )}
        {films && films?.docs?.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious disabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)} />
              </PaginationItem>
              {renderPagination()}

              <PaginationItem>
                <PaginationNext
                  disabled={currentPage === films?.pages}
                  onClick={() => handlePageClick(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
};

export default Main;
