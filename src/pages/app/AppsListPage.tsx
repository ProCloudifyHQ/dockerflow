import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  Cpu, 
  Activity, 
  Globe,
  Settings,
  RefreshCw,
  Trash2,
  Pause
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, Badge, Input } from '../../components/ui/Layout';
import { MOCK_APPS } from '../../lib/mockData';

export default function AppsListPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'running' | 'failed' | 'paused'>('all');

  const filteredApps = MOCK_APPS.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || app.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and monitor all your deployed Docker apps.</p>
        </div>
        <Link to="/apps/new">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            New Application
          </Button>
        </Link>
      </div>

      <Card className="border-none shadow-sm overflow-visible">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search apps by name..." 
              className="pl-10 h-10 w-full max-w-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
              {(['all', 'running', 'failed', 'paused'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md capitalize transition-all",
                    filter === f 
                      ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-muted-foreground font-medium uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4">App Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Resource Plan</th>
                <th className="px-6 py-4">Runtime</th>
                <th className="px-6 py-4">Last Deploy</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredApps.length > 0 ? filteredApps.map((app) => (
                <tr key={app.id} className="group hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-5">
                    <Link to={`/apps/${app.id}`} className="hover:underline">
                      <div className="font-semibold">{app.name}</div>
                    </Link>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-1">
                      <Globe className="w-3 h-3" />
                      {app.domain}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className={cn(
                        "w-2 h-2 rounded-full",
                        app.status === 'running' ? 'bg-emerald-500 animate-pulse' : 
                        app.status === 'deploying' ? 'bg-primary animate-spin-slow' : 
                        app.status === 'failed' ? 'bg-destructive' : 'bg-muted-foreground'
                      )} />
                      <Badge variant={app.status === 'running' ? 'success' : app.status === 'deploying' ? 'info' : app.status === 'failed' ? 'error' : 'neutral'}>
                        {app.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{app.plan}</div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1"><Cpu className="w-3 h-3" />{app.cpu}</span>
                        <span className="flex items-center gap-1"><Activity className="w-3 h-3" />{app.ram}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600 dark:text-slate-400 font-medium">
                    {app.runtime}
                  </td>
                  <td className="px-6 py-5 text-slate-500 dark:text-slate-400">
                    {app.lastDeploy}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/apps/${app.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-lg font-bold">No apps found</p>
                        <p className="text-slate-500">Try adjusting your search or filters.</p>
                      </div>
                      <Button variant="outline" onClick={() => { setSearch(''); setFilter('all'); }}>
                        Clear All Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Add slow spin animation to tailwind config? No just use standard spin or create it in index.css
import { cn } from '../../lib/utils';
