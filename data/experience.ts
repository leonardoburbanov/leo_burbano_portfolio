import type { CompanyId } from '@/data/companies';

// Role, period and impact copy lives in messages under Experience.roles.<id>.
export const experience: { id: CompanyId; company: string }[] = [
  { id: 'mercately', company: 'Mercately (Techstars)' },
  { id: 'taxflow', company: 'Taxflow, Inc. (San Francisco)' },
  { id: 'thoughtworks', company: 'Thoughtworks' },
];
