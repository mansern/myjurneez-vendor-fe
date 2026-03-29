import { Task } from '@/types/task';
import { useLocale } from '@/hooks/useLocale';

export function TaskTable({ tasks, onRowClick }: { tasks: Task[], onRowClick: (id: string) => void }) {
  const { t, locale } = useLocale();

  const formatDate = (dateInput: any) => {
    if (!dateInput) return '---';
    return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).format(new Date(dateInput));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-muted/30 text-muted-foreground/70 uppercase text-[11px] tracking-widest font-black border-b">
          <tr>
            <th className="px-8 py-5">Property & Description</th>
            <th className="px-6 py-5">Category</th>
            <th className="px-6 py-5 text-center">Status</th>
            <th className="px-6 py-5">Priority</th>
            <th className="px-8 py-5 text-right">Due Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {tasks.map((task) => (
            <tr 
              key={task.id} 
              onClick={() => onRowClick(task.id)}
              className="group hover:bg-primary/[0.02] transition-all duration-200 cursor-pointer active:scale-[0.995]"
            >
              <td className="px-8 py-6">
                <div className="font-bold text-foreground group-hover:text-primary transition-colors">{task.propertyName}</div>
                {/* Description added to table row for quick context */}
                <div className="text-[11px] text-muted-foreground line-clamp-1 mt-1 font-medium italic">"{task.description}"</div>
              </td>
              <td className="px-6 py-6 uppercase text-[10px] font-black text-foreground/60">{t(`category.${task.category}`)}</td>
              <td className="px-6 py-6 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-black uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  {t(`status.${task.status}`)}
                </span>
              </td>
              <td className="px-6 py-6 font-medium text-muted-foreground italic">{t(`priority.${task.priority}`)}</td>
              <td className="px-8 py-6 text-right font-semibold text-foreground/70">{formatDate(task.dueDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}