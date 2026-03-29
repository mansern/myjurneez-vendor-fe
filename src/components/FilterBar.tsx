import { TaskFilters, TaskCategory, TaskStatus } from '@/types/task';
import { useLocale } from '@/hooks/useLocale';

interface FilterBarProps {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
}

const statuses: string[] = ['open', 'resolved', 'in_progress']; 
const categories: string[] = ['PLUMBING', 'CLEANING', 'MAINTENANCE', 'ELECTRICAL'];

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const { t } = useLocale();

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={filters.status || ''}
        onChange={(e) => onChange({ ...filters, status: e.target.value as TaskStatus | '' })}
        className="rounded-lg border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">{t('tasks.allStatuses')}</option>
        {statuses.map((s) => (
          <option key={s} value={s}>{t(`status.${s}`)}</option>
        ))}
      </select>

      <select
        value={filters.category || ''}
        onChange={(e) => onChange({ ...filters, category: e.target.value as TaskCategory | '' })}
        className="rounded-lg border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">{t('tasks.allCategories')}</option>
        {categories.map((c) => (
          <option key={c} value={c}>{t(`category.${c}`)}</option>
        ))}
      </select>

      <input
        type="date"
        value={filters.date || ''}
        onChange={(e) => onChange({ ...filters, date: e.target.value })}
        className="rounded-lg border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
