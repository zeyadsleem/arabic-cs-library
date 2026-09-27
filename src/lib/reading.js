const KEY = 'arabic-cs-library:last-read';

export const readPosition = () => {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

export const savePosition = (position) => {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...position, at: Date.now() }));
  } catch (error) {
    return;
  }
};
