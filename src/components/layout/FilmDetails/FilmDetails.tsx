import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { convertMinutesToHours } from "@/lib/convertMinutesToHours";
import { FilmDetail } from "@/types/Films";

const FilmDetails = ({ film }: { film?: FilmDetail }) => {
  return (
    <div className="w-[1440px] mx-auto mt-6 flex gap-4">
      <img src={film?.poster?.previewUrl || film?.poster?.url || ""} alt="poster" className="rounded-md w-[296px]" />
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          {film?.name} ({film?.year})
        </h1>
        <p className="text-muted-foreground mt-4 text-xl">
          {film?.enName} {film?.ageRating}+
        </p>
        <p className="mt-8 text-xl font-semibold">О Фильме</p>
        <Table className="mt-2">
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Год производства</TableCell>
              <TableCell className="text-muted-foreground">{film?.year}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Страна</TableCell>
              <TableCell className="text-muted-foreground">
                {film?.countries.map((country) => country.name).join(", ")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Жанр</TableCell>
              <TableCell className="text-muted-foreground">
                {film?.genres.map((country) => country.name).join(", ")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Режиссер</TableCell>
              <TableCell className="text-muted-foreground">
                {film?.persons
                  .filter((person) => person.profession === "актеры")
                  .map((director) => director.name)
                  .join(", ")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Время</TableCell>
              <TableCell className="text-muted-foreground">{convertMinutesToHours(film?.movieLength)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Описание</TableCell>
              <TableCell className="text-muted-foreground line-clamp-3">{film?.description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FilmDetails;
