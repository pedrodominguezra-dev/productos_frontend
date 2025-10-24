export const sliceName = (value: string | undefined) => {
  if (!value) return;

  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};
