import { socialLinks } from "@/constants/social-links";

type SocialLinksProps = {
  variant?: "icons" | "buttons";
};

export default function SocialLinks({ variant = "icons" }: SocialLinksProps) {
  if (variant === "buttons") {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {socialLinks.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text-soft)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)]"
            >
              <Icon size={20} />
              {item.label}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--text-soft)] transition hover:border-[var(--primary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}