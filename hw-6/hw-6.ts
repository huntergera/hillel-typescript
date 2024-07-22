function filterArray<T>(array: T[], condition: (item: T) => boolean): T[] {
  return array.filter(condition);
}

class Stack<T> {
  elements: T[] = [];

  push(item: T): void {
    this.elements.push(item);
  }

  pop(): T | undefined {
    return this.elements.pop();
  }

  peek(): T | undefined {
    return this.elements[this.elements.length - 1];
  }
}

class Dictionary<K extends string | number, V> {
  private dict: { [key: string]: V } = {};

  set(key: K, value: V): void {
    this.dict[key.toString()] = value;
  }

  get(key: K): V | undefined {
    const stringKey = key.toString();
    return this.dict[stringKey];
  }

  has(key: K): boolean {
    return key.toString() in this.dict;
  }
}