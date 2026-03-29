import { Task } from '@/types/task';
import { useLocale } from '@/hooks/useLocale';
import { DoorOpen, Tag, Calendar, AlertCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const { t, locale } = useLocale();

  const formatCardDate = (dateString: string) => {
    if (!dateString) return '---';
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      day: 'numeric', month: 'short', year: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-card border border-border/70 rounded-[28px] p-6 shadow-sm hover:shadow-xl hover:border-primary/20 hover:bg-muted/30 transition-all duration-300 cursor-pointer active:scale-95 animate-in fade-in flex flex-col h-full"
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
          {task.propertyName}
        </h3>
        <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-black uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          {t(`status.${task.status}`)}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium mb-5">
        <span className="flex items-center gap-1.5"><DoorOpen className="h-4 w-4 text-primary/70" />{task.unitNumber}</span>
        <span className="flex items-center gap-1.5 uppercase text-xs font-bold text-foreground/70"><Tag className="h-4 w-4 text-primary/70" />{t(`category.${task.category}`)}</span>
      </div>

      {/* Description now uses mapped issueTitle */}
      <div className="mb-5 bg-muted/30 p-3 rounded-xl border border-black/[0.03] flex-grow">
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3 italic">
          {task.description ? `"${task.description}"` : '"No description provided."'}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t pt-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground/80">
          <Calendar className="h-4 w-4 text-muted-foreground/60" />
          <span>{formatCardDate(task.dueDate)}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-full border">
          <AlertCircle className="h-3.5 w-3.5 text-orange-500" />
          <span className="text-[10px] font-bold text-orange-700 uppercase">{t(`priority.${task.priority}`)}</span>
        </div>
      </div>
    </div>
  );
}