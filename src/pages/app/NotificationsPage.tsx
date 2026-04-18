import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  XCircle, 
  Info, 
  AlertTriangle,
  Clock,
  Trash2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, Badge } from '../../components/ui/Layout';
import { MOCK_NOTIFICATIONS } from '../../lib/mockData';
import { cn } from '../../lib/utils';

export default function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      default: return <Info className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-slate-500">Stay updated on your app deployments and health.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Mark all as read</Button>
          <Button variant="outline" size="sm" className="text-red-500">Clear all</Button>
        </div>
      </div>

      <Card>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {MOCK_NOTIFICATIONS.length > 0 ? MOCK_NOTIFICATIONS.map((n) => (
            <div 
              key={n.id} 
              className={cn(
                "p-6 flex gap-5 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors",
                !n.read ? "bg-indigo-50/30 dark:bg-indigo-900/10 border-l-4 border-l-indigo-600" : ""
              )}
            >
              <div className="mt-1">{getIcon(n.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={cn("font-bold text-lg", !n.read ? "text-indigo-900 dark:text-indigo-400" : "")}>
                    {n.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {n.time}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{n.message}</p>
                <div className="mt-4 flex gap-4">
                  <button className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 uppercase tracking-widest">Archive</button>
                  <button className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-widest">View Details</button>
                </div>
              </div>
            </div>
          )) : (
            <div className="py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-lg font-bold">All caught up!</p>
              <p className="text-slate-500">No new notifications at the moment.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
