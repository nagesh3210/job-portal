
// src/features/employers/employer.types.ts
export const organizationTypesOPtions = [
  "development",
  "design",
  "marketing",
  "sales",
  "hr",
  "finance",
] as const;

export type OrganizationType =
  (typeof organizationTypesOPtions)[number];

export const teamSizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
] as const;

export type TeamSize = (typeof teamSizes)[number];

export interface IFormInput {
  name: string;
  description: string;
  location: string;
  yearOfEstablishment: string;
  websiteUrl?: string;
  organizationType: OrganizationType;
  teamSize: TeamSize;
}
