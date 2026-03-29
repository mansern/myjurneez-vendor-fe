import { useLocale } from '@/hooks/useLocale';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-card px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            MJ
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold leading-tight">{t('app.name')}</h1>
            <p className="text-xs text-muted-foreground">{t('app.subtitle')}</p>
          </div>
        </div>
      </div>
      <LanguageSwitcher />
    </header>
  );
}
