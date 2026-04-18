import React from 'react';
import { HardDrive, Plus, Database, Server, Info, Trash2, Settings, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Badge } from '../../components/ui/Layout';

export default function StoragePage() {
  const volumes = [
    { id: 'vol-1', name: 'postgres-data', size: '20 GB', type: 'SSD', app: 'api-service', mount: '/var/lib/postgresql/data' },
    { id: 'vol-2', name: 'user-uploads', size: '100 GB', type: 'SSD', app: 'frontend-web', mount: '/app/uploads' },
    { id: 'vol-3', name: 'temp-work', size: '5 GB', type: 'Standard', app: 'worker-queue', mount: '/tmp/worker' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Persistent Storage</h1>
          <p className="text-slate-500">Manage high-performance SSD volumes and object storage for your applications.</p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Create Volume
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-indigo-600 text-white border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <p className="text-indigo-100 font-bold uppercase text-[10px] tracking-widest">Total SSD Storage</p>
                <p className="text-3xl font-black">125 GB</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-indigo-100">
                <span>Usage</span>
                <span>42%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[42%]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4 text-emerald-600">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Object Storage (S3)</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">5.2 TB</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">Across 12 private buckets</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col justify-center h-full">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold">Automatic Backups</p>
                <p className="text-xs text-slate-500 mt-1">Snapshot-based backups are enabled for all SSD volumes.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="font-bold">Attached Volumes</h3>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">Volume Name</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Application</th>
                <th className="px-6 py-4">Mount Point</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {volumes.map((vol) => (
                <tr key={vol.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <td className="px-6 py-5 font-bold tracking-tight">{vol.name}</td>
                  <td className="px-6 py-5">
                    <Badge variant="neutral" className="bg-slate-200 dark:bg-slate-800">
                      {vol.size} {vol.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-indigo-600 font-bold">{vol.app}</td>
                  <td className="px-6 py-5 font-mono text-xs text-slate-500">{vol.mount}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon"><Settings className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-red-400" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
