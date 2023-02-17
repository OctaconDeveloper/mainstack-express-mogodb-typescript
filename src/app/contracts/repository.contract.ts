export interface IWriteOperation<T> {
    create(data: T): Promise<boolean>;
    update(uuid: string, data: T): Promise<boolean>;
    delete(uuid: string): Promise<boolean>;
}

export interface IReadOperation<T> {
    find(data: T): Promise<T[]>;
    findOne(uuid: string): Promise<T>;
}