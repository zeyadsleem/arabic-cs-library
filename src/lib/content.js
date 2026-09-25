import manifest from './generated/manifest.json';
import { withBasePath } from './html.js';

export const library = manifest;
export const books = manifest.books;

const sectionModules = import.meta.glob('/src/lib/generated/sections/*.json');

export const bookPath = (book) => withBasePath(`/book/${book}`);

export const sectionPath = (book, chapter, slug) =>
  withBasePath(`/book/${book}/${chapter}/${slug}`);

export const getBook = (id) => books.find((book) => book.id === id) || null;

export const loadSection = async (book, chapter, slug) => {
  const key = `/src/lib/generated/sections/${book}__${chapter}--${slug}.json`;
  const loader = sectionModules[key];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
};

export const getPrevNext = (book, chapter, slug) => {
  const sections = manifest.sections.filter((item) => item.book === book);
  const index = sections.findIndex(
    (item) => item.chapter === chapter && item.slug === slug
  );
  return {
    prev: index > 0 ? sections[index - 1] : null,
    next: index >= 0 && index < sections.length - 1 ? sections[index + 1] : null,
  };
};

export const allSections = manifest.sections;
