import { Films } from "@/types/Films";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";

const FilmQueryList = ({ films, isFetching, close }: { films?: Films; isFetching: boolean; close: () => void }) => {
  const navigate = useNavigate();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClickItem = (filmId: string) => {
    navigate({ to: `/films/${filmId}` });
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent, filmId: string, index: number) => {
    if (e.key === "Enter") {
      handleClickItem(filmId);
    } else if (e.key === "ArrowDown") {
      if (index < cardRefs.current.length - 1) {
        cardRefs.current[index + 1]?.focus();
      }
    } else if (e.key === "ArrowUp") {
      if (index > 0) {
        cardRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <Card className="absolute w-[296px] top-[48px] rounded-md p-2 flex flex-col gap-2">
      {isFetching ? (
        Array.from({ length: 5 }, (_, index) => <Skeleton className="w-full p-2 h-[60px]" key={index} />)
      ) : films && films?.docs.length > 0 ? (
        films?.docs
          .filter((film) => film.name && film.description)
          .map((film, index) => (
            <Card
              key={film.id}
              ref={(ref) => (cardRefs.current[index] = ref)}
              tabIndex={0}
              onKeyDown={(event) => handleKeyDown(event, film.id, index)}
              onClick={() => handleClickItem(film.id)}
              className="rounded-md p-2 cursor-pointer flex gap-1 hover:scale-[1.02] hover:shadow-md transform transition duration-300"
            >
              <img className="w-8 rounded-sm aspect-[9/16]" src={film.poster.previewUrl} alt="poster" />
              <div className="flex flex-col justify-between">
                <CardTitle className="line-clamp-1 leading-1">{film.name}</CardTitle>
                <CardDescription className="line-clamp-1 text-xs leading-4">{film.enName}</CardDescription>
                <CardDescription className="line-clamp-1 text-xs leading-4">{film.description}</CardDescription>
              </div>
            </Card>
          ))
      ) : (
        <p className="text-center text-sm">ничего не найдено</p>
      )}
    </Card>
  );
};

export default FilmQueryList;
