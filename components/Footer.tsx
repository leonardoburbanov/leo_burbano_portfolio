import { Github, Instagram, LinkedinIcon, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { socialLinks } from '@/lib/site';

export default function Footer() {
  const t = useTranslations('Footer');
  const links = [
    { href: socialLinks.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: socialLinks.github, label: 'GitHub', Icon: Github },
    { href: socialLinks.instagram, label: `Instagram · ${t('content')}`, Icon: Instagram },
    { href: socialLinks.youtube, label: 'YouTube', Icon: Youtube },
  ].filter((link) => link.href);

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-[1080px] px-5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Leonardo Burbano. {t('rights')}
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {links.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
