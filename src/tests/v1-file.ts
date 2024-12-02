// v1-file.ts

export function joinCollections(
  collectionA: any[],
  collectionB: any[],
  keyA: string,
  keyB: string
): (any & { related: any | null })[] {
  return collectionA.map((itemA: any) => {
    const relatedItemB = collectionB.find(
      (itemB: any) => itemA[keyA] === itemB[keyB]
    );
    return {
      ...itemA,
      related: relatedItemB || null,
    };
  });
}

export function groupBy<T>(collection: T[], key: keyof T): Record<string, T[]> {
  return collection.reduce((result: Record<string, T[]>, item) => {
    const groupKey = item[key] as string;
    const keyString = String(groupKey);

    if (!result[keyString]) {
      result[keyString] = [];
    }

    result[keyString].push(item);
    return result;
  }, {});
}

export function sort(collection: string, sortKey: string, descending = false) {
  const documents: any[] = []; // Replace with your mock DB call
  return documents.sort((a, b) => {
    if (a[sortKey] > b[sortKey]) return descending ? -1 : 1;
    if (a[sortKey] < b[sortKey]) return descending ? 1 : -1;
    return 0;
  });
}
