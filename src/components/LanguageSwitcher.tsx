import { useLocale } from '@/hooks/useLocale';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
      className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      <Globe className="h-4 w-4" />
      <span>{locale === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}
