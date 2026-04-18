import React from 'react';
import { 
  GitBranch, 
  ExternalLink, 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  PlayCircle 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, Badge } from '../../components/ui/Layout';
import { MOCK_DEPLOYMENTS, MOCK_APPS } from '../../lib/mockData';

export default function DeploymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Global Deployments</h1>
          <p className="text-slate-500 dark:text-slate-400">View history of all deployments across your workspace.</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
            <tr>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Application</th>
              <th className="px-6 py-4">Commit / Message</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {MOCK_DEPLOYMENTS.map((d) => {
              const app = MOCK_APPS.find(a => a.id === d.appId) || MOCK_APPS[0];
              return (
                <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {d.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {d.status === 'failed' && <XCircle className="w-4 h-4 text-red-500" />}
                      {d.status === 'in-progress' && <PlayCircle className="w-4 h-4 text-indigo-500 animate-spin-slow" />}
                      <span className="capitalize font-medium">{d.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{app.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-[240px] truncate font-medium text-slate-600 dark:text-slate-300">
                      {d.commit}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <GitBranch className="w-3 h-3" />
                      {d.source || 'main'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {d.timestamp}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
