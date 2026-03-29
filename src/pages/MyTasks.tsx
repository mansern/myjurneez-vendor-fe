import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/hooks/useLocale';
import { taskService } from '@/services/taskService';
import { Task, TaskFilters } from '@/types/task';
import { TaskCard } from '@/components/TaskCard';
import { TaskTable } from '@/components/TaskTable';
import { FilterBar } from '@/components/FilterBar';
import { LayoutGrid, List, Briefcase, CheckCircle2, Clock, AlertCircle, Inbox } from 'lucide-react';

export default function MyTasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'card'>('list');
  const [filters, setFilters] = useState<TaskFilters>({});

  const stats = useMemo(() => ({
    total: tasks.length,
    open: tasks.filter(t => String(t.status).toLowerCase() === 'open').length,
    inProgress: tasks.filter(t => ['in_progress', 'inprogress', 'assigned'].includes(String(t.status).toLowerCase())).length,
    completed: tasks.filter(t => ['resolved', 'completed'].includes(String(t.status).toLowerCase())).length,
  }), [tasks]);

  useEffect(() => {
    setLoading(true);
    taskService.getTasks(filters).then(data => {
      setTasks(data);
      setLoading(false);
    }).catch(() => {
      setTasks([]);
      setLoading(false);
    });
  }, [filters]);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto p-6 animate-in fade-in duration-700">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground/90">My Tasks</h2>
          <p className="text-muted-foreground text-lg italic">Vendor Portal Experience</p>
        </div>
        <div className="flex flex-wrap gap-3 bg-card/40 p-2 rounded-2xl border border-border/50 backdrop-blur-xl shadow-sm">
          <StatMini label="Total" value={stats.total} icon={<Briefcase className="w-4 h-4" />} color="text-blue-500" />
          <StatMini label="Open" value={stats.open} icon={<AlertCircle className="w-4 h-4" />} color="text-amber-500" />
          <StatMini label="Active" value={stats.inProgress} icon={<Clock className="w-4 h-4" />} color="text-indigo-500" />
          <StatMini label="Done" value={stats.completed} icon={<CheckCircle2 className="w-4 h-4" />} color="text-emerald-500" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-3 rounded-2xl border shadow-lg shadow-black/[0.02]">
        <div className="w-full md:w-auto flex-1"><FilterBar filters={filters} onChange={setFilters} /></div>
        <div className="flex items-center gap-1.5 bg-muted/50 p-1.5 rounded-xl border">
          <button onClick={() => setView('list')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${view === 'list' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground'}`}><List className="h-4 w-4" /> List</button>
          <button onClick={() => setView('card')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${view === 'card' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground'}`}><LayoutGrid className="h-4 w-4" /> Cards</button>
        </div>
      </div>

      <div className="relative">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-4 animate-pulse opacity-50">{[...Array(4)].map((_, i) => <div key={i} className="h-48 rounded-3xl bg-muted" />)}</div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 rounded-[32px] border-2 border-dashed border-muted bg-muted/5">
            <Inbox className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-xl font-bold">No tasks assigned</h3>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-2 duration-500">
            {view === 'list' ? (
              <div className="rounded-[32px] border bg-card shadow-2xl shadow-black/[0.03] overflow-hidden">
                <TaskTable tasks={tasks} onRowClick={(id) => navigate(`/tasks/${id}`)} />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {tasks.map((task) => <TaskCard key={task.id} task={task} onClick={() => navigate(`/tasks/${task.id}`)} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatMini({ label, value, icon, color }: any) {
  return (
    <div className="flex items-center gap-4 px-5 py-2">
      <div className={`p-2.5 rounded-xl bg-background shadow-sm border ${color}`}>{icon}</div>
      <div>
        <p className="text-[11px] uppercase tracking-widest font-black text-muted-foreground/60 leading-none mb-1">{label}</p>
        <p className="text-xl font-black text-foreground leading-tight">{value}</p>
      </div>
    </div>
  );
}