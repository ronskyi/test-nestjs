export class CollectionResponse<T> {
  items: T[];
  total: number;

  constructor(
    items: T[],
    total: number,
  ) {
    this.total = total;
    this.items = items;
  }

}