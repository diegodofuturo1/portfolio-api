export interface AlphanumericSorter {
  order: number;
}

export const alphanumericSorter = (a: AlphanumericSorter, b: AlphanumericSorter) =>
  a.order - b.order;

export const alphanumericDescSorter = (a: AlphanumericSorter, b: AlphanumericSorter) =>
  b.order - a.order;
