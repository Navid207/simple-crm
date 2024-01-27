import { UserData } from "./user-data";

export interface CompanyData {
    id?: string,
    name: string,
    street: string,
    no: string,
    city: string,
    country: string,
    field: string,
    link?: string,
    users?: UserData[],
    assigned?: string[];
}
