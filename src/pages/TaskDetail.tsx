import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskService } from '@/services/taskService';
import { Task } from '@/types/task';
import { ArrowLeft, DoorOpen, Tag, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to ensure data is always mapped correctly
  const mapTaskData = (rawData: any): Task => ({
    ...rawData,
    description: rawData.issueTitle || rawData.description,
    propertyName: rawData.propertyName,
    unitNumber: rawData.unitNumber,
    status: rawData.status?.toLowerCase() || 'open'
  });

  useEffect(() => {
    if (!id) return;
    taskService.getTaskById(id)
      .then((data) => {
        console.log('######', data)
        setTask(mapTaskData(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return;
    try {
      const updatedRaw = await taskService.updateTaskStatus(id, newStatus);
      // FIX: Map the updated data before setting state
      setTask(mapTaskData(updatedRaw));
      toast.success(`Task marked as ${newStatus}`);
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse font-black text-primary">LOADING...</div>;
  if (!task) return <div className="p-10 text-center">Task not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 font-bold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {/* Header Section */}
      <div className="bg-card border rounded-[32px] p-8 shadow-2xl shadow-black/[0.02]">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-black tracking-tight">{task.propertyName}</h1>
          <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
            {task.status}
          </span>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-xl text-sm font-bold">
            <DoorOpen className="h-4 w-4 text-primary" /> {task.unitNumber}
          </div>
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-xl text-sm font-bold">
            <Tag className="h-4 w-4 text-primary" /> {task.category}
          </div>
        </div>

        <div className="bg-muted/30 border border-black/[0.03] p-6 rounded-2xl italic font-medium text-lg text-foreground/80">
          "{task.description}"
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-card border rounded-[32px] p-8 space-y-6">
        <h3 className="text-xl font-black flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-primary" /> Vendor Actions
        </h3>
        
        <div className="flex gap-4">
          <button 
            onClick={() => handleStatusChange('in_progress')}
            disabled={task.status === 'in_progress'}
            className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg ${
              task.status === 'in_progress' ? 'bg-muted text-muted-foreground' : 'bg-[#E9A144] text-white'
            }`}
          >
            START TASK
          </button>
          
          <button 
            onClick={() => handleStatusChange('completed')}
            disabled={task.status === 'completed'}
            className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg ${
              task.status === 'completed' ? 'bg-muted text-muted-foreground' : 'bg-[#4B9372] text-white'
            }`}
          >
            MARK COMPLETE
          </button>
        </div>
      </div>
    </div>
  );
}