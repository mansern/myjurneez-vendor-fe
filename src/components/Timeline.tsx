import { TaskStatus } from '@/types/task';
import { useLocale } from '@/hooks/useLocale';
import { Check, Circle, Loader2 } from 'lucide-react';

const steps: TaskStatus[] = ['Assigned', 'InProgress', 'Completed'];

const stepIcon: Record<TaskStatus, React.ElementType> = {
  Assigned: Circle,
  InProgress: Loader2,
  Completed: Check,
};

export function Timeline({ currentStatus }: { currentStatus: TaskStatus }) {
  const { t } = useLocale();
  const currentIdx = steps.indexOf(currentStatus);

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, idx) => {
        const Icon = stepIcon[step];
        const done = idx <= currentIdx;
        return (
          <div key={step} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                  done
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className={`text-xs font-medium ${done ? 'text-foreground' : 'text-muted-foreground'}`}>
                {t(`status.${step}`)}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 w-8 md:w-16 ${
                  idx < currentIdx ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
