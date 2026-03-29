import { useLocale } from '@/hooks/useLocale';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function SettingsPage() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h2 className="text-2xl font-bold">{t('settings.title')}</h2>

      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold">{t('settings.language')}</h3>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
