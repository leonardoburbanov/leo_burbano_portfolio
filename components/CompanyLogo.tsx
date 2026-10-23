import Image from 'next/image';
import { companies, type CompanyId } from '@/data/companies';

// Monochrome company mark sitting directly on the page (black on light, white on dark).
// Square icons (no wordmark in the file) get the company name set beside them.
export default function CompanyLogo({ id, height = 24 }: { id: CompanyId; height?: number }) {
  const company = companies[id];
  const logo = company.logo;
  const isIcon = logo && logo.width === logo.height;

  if (!logo) return <span className="text-base font-semibold tracking-tight">{company.name}</span>;

  return (
    <span className="inline-flex items-center gap-2" style={{ height }}>
      <Image
        src={logo.src}
        alt={isIcon ? '' : company.name}
        width={Math.round((logo.width / logo.height) * height)}
        height={height}
        className={`w-auto object-contain ${isIcon ? 'rounded-[22%] dark:invert' : 'logo-mono'}`}
        style={{ height }}
      />
      {isIcon && <span className="text-[1.05em] font-semibold tracking-[-0.02em]">{company.name}</span>}
    </span>
  );
}
