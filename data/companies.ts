// `logo` is the file in /public/logos (null renders a text wordmark until a logo is added).
export const companies = {
  mercately: { name: 'Mercately', logo: { src: '/logos/mercately.png', width: 3383, height: 699 } },
  taxflow: { name: 'Taxflow', logo: null },
  thoughtworks: { name: 'Thoughtworks', logo: { src: '/logos/thoughtworks.png', width: 960, height: 156 } },
} as const;

export type CompanyId = keyof typeof companies;
