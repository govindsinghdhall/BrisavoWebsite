import type {
  HydratedDocument,
  Model,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from "mongoose";

import type {
  CreateEntityInput,
  EntityWithIntegerId,
  PaginatedResult,
  PaginationParams,
  RepositoryListOptions,
  UpdateEntityInput,
} from "@/types";

type SortDefinition<TEntity> = Partial<Record<Extract<keyof TEntity, string>, SortOrder>>;

export type RepositoryContext = {
  defaultLimit?: number;
  maxLimit?: number;
};

export type FindManyOptions<TEntity> = RepositoryListOptions<TEntity> & {
  projection?: ProjectionType<TEntity>;
  queryOptions?: QueryOptions<TEntity>;
};

export abstract class BaseRepository<TEntity extends EntityWithIntegerId> {
  protected readonly defaultLimit: number;
  protected readonly maxLimit: number;

  protected constructor(
    protected readonly model: Model<TEntity>,
    context: RepositoryContext = {},
  ) {
    this.defaultLimit = context.defaultLimit ?? 20;
    this.maxLimit = context.maxLimit ?? 100;
  }

  async create(input: CreateEntityInput<TEntity>) {
    const document = await this.model.create(input as Partial<TEntity>);
    return this.serialize(document);
  }

  async findById(id: number, options: Omit<FindManyOptions<TEntity>, "filter" | "pagination" | "sort"> = {}) {
    const document = await this.model
      .findOne(this.byId(id), this.getProjection(options.projection), this.getQueryOptions(options.queryOptions))
      .lean<TEntity>()
      .exec();

    return this.serialize(document);
  }

  async findOne(filter: QueryFilter<TEntity>, options: Omit<FindManyOptions<TEntity>, "filter" | "pagination" | "sort"> = {}) {
    const document = await this.model
      .findOne(filter, this.getProjection(options.projection), this.getQueryOptions(options.queryOptions))
      .lean<TEntity>()
      .exec();

    return this.serialize(document);
  }

  async findMany(options: FindManyOptions<TEntity> = {}) {
    const { filter = {}, pagination, projection, queryOptions, sort } = options;
    const { limit, skip } = this.resolvePagination(pagination);

    const documents = await this.model
      .find(filter, this.getProjection(projection), this.getQueryOptions(queryOptions))
      .sort(this.resolveSort(sort))
      .skip(skip)
      .limit(limit)
      .lean<TEntity[]>()
      .exec();

    return documents.map((document) => this.serialize(document) as TEntity);
  }

  async paginate(options: FindManyOptions<TEntity> = {}): Promise<PaginatedResult<TEntity>> {
    const { filter = {}, pagination, projection, queryOptions, sort } = options;
    const { limit, page, skip } = this.resolvePagination(pagination);

    const [items, total] = await Promise.all([
      this.model
        .find(filter, this.getProjection(projection), this.getQueryOptions(queryOptions))
        .sort(this.resolveSort(sort))
        .skip(skip)
        .limit(limit)
        .lean<TEntity[]>()
        .exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    return {
      items: items.map((item) => this.serialize(item) as TEntity),
      limit,
      page,
      pages: Math.ceil(total / limit),
      total,
    };
  }

  async updateById(id: number, input: UpdateEntityInput<TEntity>) {
    const document = await this.model
      .findOneAndUpdate(this.byId(id), input as UpdateQuery<TEntity>, {
        new: true,
        runValidators: true,
        projection: this.privateProjection,
      })
      .lean<TEntity>()
      .exec();

    return this.serialize(document);
  }

  async deleteById(id: number) {
    const result = await this.model.deleteOne(this.byId(id)).exec();
    return result.deletedCount === 1;
  }

  async softDeleteById(id: number) {
    const document = await this.model
      .findOneAndUpdate(
        this.byId(id),
        {
          $set: {
            deletedAt: new Date(),
            isDeleted: true,
          },
        } as UpdateQuery<TEntity>,
        {
          new: true,
          projection: this.privateProjection,
          runValidators: true,
        },
      )
      .lean<TEntity>()
      .exec();

    return this.serialize(document);
  }

  async restoreById(id: number) {
    const document = await this.model
      .findOneAndUpdate(
        this.byId(id),
        {
          $set: {
            isDeleted: false,
          },
          $unset: {
            deletedAt: "",
          },
        } as UpdateQuery<TEntity>,
        {
          new: true,
          projection: this.privateProjection,
          runValidators: true,
        },
      )
      .lean<TEntity>()
      .exec();

    return this.serialize(document);
  }

  async exists(filter: QueryFilter<TEntity>) {
    const document = await this.model.exists(filter).exec();
    return document !== null;
  }

  async count(filter: QueryFilter<TEntity> = {}) {
    return this.model.countDocuments(filter).exec();
  }

  protected byId(id: number): QueryFilter<TEntity> {
    return { id } as QueryFilter<TEntity>;
  }

  protected get privateProjection() {
    return {
      __v: 0,
      _id: 0,
    };
  }

  protected getProjection(projection?: ProjectionType<TEntity>) {
    return projection ?? this.privateProjection;
  }

  protected getQueryOptions(queryOptions?: QueryOptions<TEntity>) {
    return queryOptions ?? {};
  }

  protected resolveSort(sort?: SortDefinition<TEntity>): Record<string, SortOrder> {
    return (sort ?? { id: -1 }) as Record<string, SortOrder>;
  }

  protected resolvePagination(pagination: PaginationParams = {}) {
    const page = Math.max(1, pagination.page ?? 1);
    const limit = Math.min(this.maxLimit, Math.max(1, pagination.limit ?? this.defaultLimit));

    return {
      limit,
      page,
      skip: (page - 1) * limit,
    };
  }

  protected serialize(document: HydratedDocument<TEntity> | TEntity | null) {
    if (!document) {
      return null;
    }

    const value = this.isHydratedDocument(document) ? document.toObject() : document;
    const entity = { ...value } as TEntity & {
      __v?: number;
      _id?: unknown;
    };

    delete entity._id;
    delete entity.__v;

    return entity as TEntity;
  }

  private isHydratedDocument(document: HydratedDocument<TEntity> | TEntity): document is HydratedDocument<TEntity> {
    return "toObject" in document && typeof document.toObject === "function";
  }
}
