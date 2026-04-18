import React from 'react';
import { History, Plus, RotateCcw, Clock, Shield, Database, MoreVertical, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Badge, Input } from '../../components/ui/Layout';

export default function BackupsPage() {
  const backups = [
    { id: 'bak-123', app: 'api-service', date: '2026-04-17 04:00', size: '1.2 GB', type: 'Daily Auto', status: 'Completed' },
    { id: 'bak-122', app: 'frontend-web', date: '2026-04-17 03:30', size: '450 MB', type: 'Daily Auto', status: 'Completed' },
    { id: 'bak-121', app: 'api-service', date: '2026-04-16 14:20', size: '1.1 GB', type: 'Manual', status: 'Completed' },
    { id: 'bak-120', app: 'data-analyzer', date: '2026-04-16 04:00', size: '12.4 GB', type: 'Daily Auto', status: 'Completed' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Backups & Disaster Recovery</h1>
          <p className="text-slate-500">Restore your applications or data volumes from previous points in time.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Clock className="w-5 h-5 mr-2" />
            Retention Settings
          </Button>
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Manual Backup
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <div className="p-4 border-b flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Filter backups..." className="pl-10 h-10 max-w-sm" />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Application</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {backups.map((bak) => (
                  <tr key={bak.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <td className="px-6 py-4">
                      <Badge variant="success">{bak.status}</Badge>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{bak.app}</td>
                    <td className="px-6 py-4 text-slate-500">{bak.date}</td>
                    <td className="px-6 py-4 font-mono text-xs">{bak.size}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-500">{bak.type}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="text-indigo-600 font-bold flex items-center gap-2">
                          <RotateCcw className="w-4 h-4" />
                          Restore
                        </Button>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4 text-slate-400" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-8">
          <Card className="bg-emerald-600 text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Shield className="w-32 h-32" />
            </div>
            <CardContent className="p-8 relative z-10 space-y-4">
              <h3 className="text-2xl font-black leading-tight">Backup Shield Enabled</h3>
              <p className="text-emerald-50 text-sm leading-relaxed">
                Daily automated snapshots are verified every 24 hours. Your data is replicated across 3 availability zones for maximum durability.
              </p>
              <div className="pt-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-emerald-600" />)}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-100 italic">3 Replicas Live</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b px-6 py-4">
              <h3 className="font-bold flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-500" />
                Snapshot Storage
              </h3>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-2xl font-black">42.5 GB</span>
                <span className="text-xs font-bold text-slate-400">of 100 GB</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[42.5%]" />
              </div>
              <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                You are currently using 42% of your allocated backup storage. Oldest backups will be auto-purged first.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
