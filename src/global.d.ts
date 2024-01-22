export {};

// declare module "@cliqz/adblocker-webextension" {
//   export type Browser = import("./node_modules/@cliqz/adblocker-webextension/dist/types/adblocker").Browser;
// }

declare global {
  interface Window {
    Kinobox: KinoboxConstructor;
  }
}

interface KinoboxConstructor {
  new (selector: string | HTMLElement, options: KinoboxOptions): KinoboxInstance;
  isMobile(): boolean;
}

interface KinoboxInstance {
  init(): void;
}

interface KinoboxOptions {
  search: KinoboxSearchOptions;
  players: unknown;
}

interface KinoboxSearchOptions {
  kinopoisk: string;
  imdb?: string;
  title?: string;
  query?: string;
}
