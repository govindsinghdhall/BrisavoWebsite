import type { EntityWithIntegerId, PaginatedResult, RepositoryListOptions } from "@/types";
import type { BaseRepository } from "../repositories";

export type ServiceContext = {
  requestId?: string;
};

export abstract class BaseService<TEntity extends EntityWithIntegerId> {
  protected constructor(
    protected readonly repository: BaseRepository<TEntity>,
    protected readonly context: ServiceContext = {},
  ) {}

  create(input: Omit<TEntity, "createdAt" | "id" | "updatedAt">) {
    return this.repository.create(input);
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  findMany(options: RepositoryListOptions<TEntity> = {}) {
    return this.repository.findMany(options);
  }

  paginate(options: RepositoryListOptions<TEntity> = {}): Promise<PaginatedResult<TEntity>> {
    return this.repository.paginate(options);
  }

  updateById(id: number, input: Partial<Omit<TEntity, "createdAt" | "id" | "updatedAt">>) {
    return this.repository.updateById(id, input);
  }

  deleteById(id: number) {
    return this.repository.deleteById(id);
  }

  softDeleteById(id: number) {
    return this.repository.softDeleteById(id);
  }

  restoreById(id: number) {
    return this.repository.restoreById(id);
  }
}
