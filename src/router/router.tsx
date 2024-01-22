import { filmById } from "@/api/filmById";
import { Header } from "@/layout/Header";
import { FilmPlayerPage } from "@/pages/FilmPlayerPage";
import { Films } from "@/pages/Films";
import { Main } from "@/pages/Main";
import { Outlet, Router, Route, RootRoute } from "@tanstack/react-router";

const rootRoute = new RootRoute({
  component: () => (
    <>
      <Header />
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Main,
});

export const filmsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "films",
  component: Films,
});

const filmPlayerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "films/$filmId",
  loader: async ({ params }) => await filmById({ filmId: params.filmId }),
  component: FilmPlayerPage,
});

const routeTree = rootRoute.addChildren([indexRoute, filmsRoute, filmPlayerRoute]);

export const router = new Router({ routeTree, defaultPreload: "intent" });
