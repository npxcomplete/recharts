function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function shallowEqual(a: unknown, b: unknown): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  // arrays done, therefore the type might be primitive
  // by implication of the same type check above, both clauses
  // will succeed or both would fail, however stating them explicitly
  // and as a disjunct serves to disambiguate the types for the
  // type checker following this conditional.
  if (!isObject(a) || !isObject(b)) {
    return a === b;
  }

  const uniqueKeys = new Set<string>();
  Object.keys(a).forEach((value: string) => uniqueKeys.add(value));
  Object.keys(b).forEach((value: string) => uniqueKeys.add(value));
  const keys = Array.from(uniqueKeys);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const { hasOwnProperty } = {};

    if (!hasOwnProperty.call(a, key) || !hasOwnProperty.call(b, key)) {
      return false;
    }

    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}
