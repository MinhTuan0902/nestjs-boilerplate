
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

export interface ManualRegisterInput {
    username: string;
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
}

export interface User {
    _id: string;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    deletedAt?: Nullable<DateTime>;
    creatorId?: Nullable<string>;
    updaterId?: Nullable<string>;
    username: string;
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
}

export interface IMutation {
    manualRegister(manualRegisterInput: ManualRegisterInput): AuthTokens | Promise<AuthTokens>;
    manualLogin(manualLoginInput: ManualLoginInput): AuthTokens | Promise<AuthTokens>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): boolean | Promise<boolean>;
    deleteUser(id: string): boolean | Promise<boolean>;
}

export type DateTime = any;
type Nullable<T> = T | null;
