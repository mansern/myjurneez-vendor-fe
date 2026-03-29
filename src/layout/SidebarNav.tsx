import { NavLink as RouterNavLink } from 'react-router-dom';
import { useLocale } from '@/hooks/useLocale';
import { LayoutDashboard, ClipboardList, Settings, X } from 'lucide-react';

interface SidebarNavProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { key: 'dashboard', path: '/', icon: LayoutDashboard },
  { key: 'myTasks', path: '/tasks', icon: ClipboardList },
  { key: 'settings', path: '/settings', icon: Settings },
] as const;

export function SidebarNav({ open, onClose }: SidebarNavProps) {
  const { t } = useLocale();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 start-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        }`}
      >
        {/* Mobile close */}
        <div className="flex h-14 items-center justify-between px-4 lg:hidden">
          <span className="text-sm font-semibold">{t('app.name')}</span>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-sidebar-accent">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Logo area for desktop */}
        <div className="hidden h-14 items-center px-4 lg:flex">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">
              MJ
            </div>
            <div>
              <p className="text-sm font-semibold">{t('app.name')}</p>
              <p className="text-xs opacity-70">{t('app.subtitle')}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <RouterNavLink
              key={item.key}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span>{t(`nav.${item.key}`)}</span>
            </RouterNavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
