import { TaskPriority } from '@/types/task';
import { useLocale } from '@/hooks/useLocale';

const priorityStyles: Record<TaskPriority, string> = {
  Low: 'bg-muted text-muted-foreground',
  Medium: 'bg-info/10 text-info',
  High: 'bg-warning/10 text-warning',
  Urgent: 'bg-destructive/10 text-destructive',
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const { t } = useLocale();
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityStyles[priority]}`}>
      {t(`priority.${priority}`)}
    </span>
  );
}
