import type { QueryFilter } from "mongoose";

import type { FilterOperatorValue, GenericFilter } from "@/types";

function isFilterOperatorValue<TValue>(value: TValue | FilterOperatorValue<TValue>): value is FilterOperatorValue<TValue> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date);
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildDatabaseFilter<TEntity>(filter: GenericFilter<TEntity> = {}): QueryFilter<TEntity> {
  const query: Record<string, unknown> = {};

  for (const [field, value] of Object.entries(filter)) {
    if (!isFilterOperatorValue(value)) {
      query[field] = value;
      continue;
    }

    const operators: Record<string, unknown> = {};

    if ("eq" in value) operators.$eq = value.eq;
    if ("exists" in value) operators.$exists = value.exists;
    if ("gt" in value) operators.$gt = value.gt;
    if ("gte" in value) operators.$gte = value.gte;
    if ("in" in value) operators.$in = value.in;
    if ("lt" in value) operators.$lt = value.lt;
    if ("lte" in value) operators.$lte = value.lte;
    if ("ne" in value) operators.$ne = value.ne;
    if ("nin" in value) operators.$nin = value.nin;

    if (typeof value.contains === "string") {
      operators.$regex = escapeRegex(value.contains);
      operators.$options = "i";
    }

    query[field] = operators;
  }

  return query as QueryFilter<TEntity>;
}
