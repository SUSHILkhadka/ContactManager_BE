import { Request } from "express";

export interface IRequestWithTokenData extends Request{
    id?: number,
    email?: string,
}