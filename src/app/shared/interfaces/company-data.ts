import { ContactData } from "./contact-data";

export interface CompanyData {
    id?: string,
    name: string,
    street: string,
    no: string,
    zipCode: number;
    city: string,
    country: string,
    sector: string,
    link?: string,
    contacts: ContactData[],
    assigned: string[];
}
