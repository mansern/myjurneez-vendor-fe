import { useEffect, useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { taskService } from '@/services/taskService';
import { Task } from '@/types/task';
import { TaskCard } from '@/components/TaskCard';
import { ClipboardList, Clock, CheckCircle2, ListTodo } from 'lucide-react';

export default function Dashboard() {
  const { t } = useLocale();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    taskService.getTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const totalTasks = tasks.length;
  const assignedToday = tasks.filter((t) => t.assignedAt === today).length;
  const inProgress = tasks.filter((t) => t.status === 'InProgress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const todaysTasks = tasks.filter((t) => t.dueDate === today || t.assignedAt === today);

  const stats = [
    { label: t('dashboard.totalTasks'), value: totalTasks, icon: ListTodo, color: 'text-primary' },
    { label: t('dashboard.assignedToday'), value: assignedToday, icon: ClipboardList, color: 'text-info' },
    { label: t('dashboard.inProgress'), value: inProgress, icon: Clock, color: 'text-warning' },
    { label: t('dashboard.completed'), value: completed, icon: CheckCircle2, color: 'text-success' },
  ];

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-muted-foreground">{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('dashboard.title')}</h2>
        <p className="text-muted-foreground">{t('dashboard.welcome')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-4 shadow-sm animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">{t('dashboard.todaysTasks')}</h3>
        {todaysTasks.length === 0 ? (
          <p className="text-muted-foreground">{t('tasks.noTasks')}</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {todaysTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
