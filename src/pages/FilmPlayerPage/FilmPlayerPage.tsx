import { filmById } from "@/api/filmById";
import { FilmDetails } from "@/components/layout/FilmDetails";
import { KinoboxPlayer } from "@/components/layout/Kinobox";
import { FilmDetail } from "@/types/Films";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

const FilmPlayerPage = () => {
  const { filmId } = useParams({ from: "$filmId" });

  const { data: film } = useQuery<FilmDetail>({
    queryKey: ["film", { filmId }],
    queryFn: () => filmById({ filmId }),
  });

  return (
    <>
      <FilmDetails film={film} />
      <KinoboxPlayer kinopoiskId={filmId} />
      <div className="h-[20px]"></div>
    </>
  );
};

export default FilmPlayerPage;
