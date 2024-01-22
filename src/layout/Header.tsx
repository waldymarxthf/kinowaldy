import { searchFilms } from "@/api/search";
import FilmQueryList from "@/components/layout/FilmQueryList/FilmQueryList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useDebouncedValue } from "@/hooks/useDebounce";
import { Films } from "@/types/Films";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery] = useDebouncedValue(inputValue, 500);
  const navigate = useNavigate();
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const { data: films, isFetching } = useQuery<Films>({
    queryKey: ["films", { debouncedQuery }],
    queryFn: () => searchFilms({ query: debouncedQuery }),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({ to: "/films", search: { query: inputValue, page: 1 } });
  };

  return (
    <header className="border-b fixed top-0 left-0 right-0 z-50 bg-background">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mx-6">
          <Link to="/" className="text-2xl font-bold">
            На главную
          </Link>
          <div className="ml-auto flex w-full max-w-sm items-center space-x-4 py-3">
            <div className="w-full relative" ref={ref}>
              <Input
                type="search"
                placeholder="Введите название фильма"
                value={inputValue}
                onClick={() => setIsOpen(true)}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {isOpen && <FilmQueryList close={() => setIsOpen(false)} films={films} isFetching={isFetching} />}
            </div>
            <Button type="submit">Найти</Button>
          </div>
          <div className="ml-4">
            <ModeToggle />
          </div>
        </div>
      </form>
    </header>
  );
};
