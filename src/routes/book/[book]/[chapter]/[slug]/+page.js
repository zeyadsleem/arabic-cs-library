import { error } from '@sveltejs/kit';
import {
  getBook,
  getPrevNext,
  loadSection,
  sectionPath,
} from '$lib/content.js';

export const entries = () =>
  getBook('hello-algo').chapters.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      book: 'hello-algo',
      chapter: chapter.key,
      slug: section.slug,
    }))
  );

export async function load({ params }) {
  const book = getBook(params.book);
  if (!book || !book.chapters) {
    throw error(404, 'الكتاب غير موجود');
  }
  const chapter = book.chapters.find((item) => item.key === params.chapter);
  if (!chapter) {
    throw error(404, 'الفصل غير موجود');
  }
  const section = chapter.sections.find((item) => item.slug === params.slug);
  if (!section) {
    throw error(404, 'القسم غير موجود');
  }
  const content = await loadSection(params.chapter, params.slug);
  const { prev, next } = getPrevNext(params.chapter, params.slug);
  return { book, chapter, section, content, prev, next, sectionPath };
}
