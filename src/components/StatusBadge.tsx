import { TaskStatus } from '@/types/task';
import { useLocale } from '@/hooks/useLocale';

const statusStyles: Record<TaskStatus, string> = {
  Assigned: 'bg-info/15 text-info',
  InProgress: 'bg-warning/15 text-warning',
  Completed: 'bg-success/15 text-success',
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  const { t } = useLocale();
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}>
      {t(`status.${status}`)}
    </span>
  );
}
