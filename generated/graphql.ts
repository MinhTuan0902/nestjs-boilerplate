
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserRole {
    User = "User",
    Admin = "Admin"
}

export enum SortingUsersOptionInput {
    CreatedAtAsc = "CreatedAtAsc",
    CreatedAtDesc = "CreatedAtDesc",
    UsernameAsc = "UsernameAsc",
    UsernameDesc = "UsernameDesc"
}

export interface QueryUsersInput {
    pageOption: PageOptionInput;
    filter: FilterUsersInput;
    sortingOption: SortingUsersOptionInput;
}

export interface PageOptionInput {
    limit: number;
    skip: number;
}

export interface FilterUsersInput {
    id_equal?: Nullable<string>;
    username_equal?: Nullable<string>;
    username_contains?: Nullable<string>;
}

export interface ManualRegisterInput {
    username: string;
    fullName: string;
    password: string;
    repeatPassword: string;
}

export interface ManualLoginInput {
    username: string;
    password: string;
}

export interface CreateUserInput {
    username: string;
    password: string;
    role: UserRole;
}

export interface UpdateUserInput {
    username?: Nullable<string>;
    password?: Nullable<string>;
    role?: Nullable<UserRole>;
    userId: string;
    email?: Nullable<string>;
}

export interface User {
    _id: string;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    deletedAt?: Nullable<DateTime>;
    creatorId?: Nullable<string>;
    updaterId?: Nullable<string>;
    username: string;
    fullName: string;
    role: UserRole;
    email?: Nullable<string>;
    isVerifiedEmail: boolean;
}

export interface PageInfo {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface PaginatedUsers {
    items: User[];
    totalItems: number;
    pageInfo: PageInfo;
}

export interface Token {
    value: string;
    expiresAt?: Nullable<DateTime>;
}

export interface AuthTokens {
    access: Token;
    refresh: Token;
}

export interface IQuery {
    getHello(): string | Promise<string>;
    getMySelf(): User | Promise<User>;
    getUser(id: string): User | Promise<User>;
    getUsers(queryUsersInput: QueryUsersInput): PaginatedUsers | Promise<PaginatedUsers>;
}

export interface IMutation {
    manualRegister(manualRegisterInput: ManualRegisterInput): AuthTokens | Promise<AuthTokens>;
    manualLogin(manualLoginInput: ManualLoginInput): AuthTokens | Promise<AuthTokens>;
    updateEmail(email: string): boolean | Promise<boolean>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): boolean | Promise<boolean>;
    deleteUser(id: string): boolean | Promise<boolean>;
}

export type DateTime = any;
type Nullable<T> = T | null;
