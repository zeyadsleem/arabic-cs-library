import { error } from '@sveltejs/kit';
import { books, getBook, library } from '$lib/content.js';

export const entries = () => books.map((book) => ({ book: book.id }));

export async function load({ params }) {
  const book = getBook(params.book);
  if (!book) {
    throw error(404, 'الكتاب غير موجود');
  }
  return { book, stages: library.path.stages };
}
