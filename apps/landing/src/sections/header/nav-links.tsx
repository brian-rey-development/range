import { NAV_LINKS } from "../../core/config/navigation";

const LINK =
  "focus-ring rounded-sm px-3 py-2 text-body-medium text-ink-2 transition-colors hover:text-ink";

type NavLinksProps = {
  readonly className?: string;
  readonly onNavigate?: () => void;
};

export function NavLinks({ className, onNavigate }: NavLinksProps) {
  return (
    <ul className={className}>
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <a href={link.href} className={LINK} onClick={onNavigate}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
