import type { HydratedDocument, QueryFilter, SortOrder } from "mongoose";

export type IntegerId = number;

export type EntityWithIntegerId = {
  id: IntegerId;
};

export type TimestampedEntity = {
  createdAt: Date;
  updatedAt: Date;
};

export type SoftDeletableEntity = {
  deletedAt?: Date | null;
  isDeleted: boolean;
};

export type DatabaseDocument<T> = HydratedDocument<T>;

export type CreateEntityInput<TEntity> = Omit<TEntity, "createdAt" | "id" | "updatedAt">;

export type UpdateEntityInput<TEntity> = Partial<CreateEntityInput<TEntity>>;

export type FilterOperatorValue<TValue> = {
  contains?: TValue extends string ? string : never;
  eq?: TValue;
  exists?: boolean;
  gt?: TValue;
  gte?: TValue;
  in?: TValue[];
  lt?: TValue;
  lte?: TValue;
  ne?: TValue;
  nin?: TValue[];
};

export type GenericFilter<TEntity> = Partial<{
  [TKey in keyof TEntity]: TEntity[TKey] | FilterOperatorValue<TEntity[TKey]>;
}>;

export type DatabaseFilter<TEntity> = QueryFilter<TEntity>;

export type SortDefinition<TEntity> = Partial<Record<Extract<keyof TEntity, string>, SortOrder>>;

export type PaginationParams = {
  limit?: number;
  page?: number;
};

export type PaginatedResult<TEntity> = {
  items: TEntity[];
  limit: number;
  page: number;
  pages: number;
  total: number;
};

export type RepositoryListOptions<TEntity> = {
  filter?: DatabaseFilter<TEntity>;
  pagination?: PaginationParams;
  sort?: SortDefinition<TEntity>;
};
