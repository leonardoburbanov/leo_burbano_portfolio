import Image from 'next/image';
import { companies, type CompanyId } from '@/data/companies';

// Company logo on a neutral chip so it reads in light and dark. Falls back to a text wordmark.
export default function CompanyLogo({ id, height = 28 }: { id: CompanyId; height?: number }) {
  const company = companies[id];
  const logo = company.logo;

  return (
    <span
      className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-3 shadow-sm"
      style={{ height: height + 16 }}
    >
      {logo ? (
        <Image
          src={logo.src}
          alt={company.name}
          width={Math.round((logo.width / logo.height) * height)}
          height={height}
          className="w-auto object-contain"
          style={{ height }}
        />
      ) : (
        <span className="text-sm font-semibold tracking-tight text-neutral-900">{company.name}</span>
      )}
    </span>
  );
}
