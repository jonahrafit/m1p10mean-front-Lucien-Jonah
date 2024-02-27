import { IEmployee } from "./IEmployee";

export interface IEmployeeResponse {
    page: number,
    size: number,
    total: number,
    employees: IEmployee[];
}