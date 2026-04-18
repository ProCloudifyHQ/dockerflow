import React from 'react';
import { Terminal, Search, Filter, Trash2, Download, PauseCircle, PlayCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Input } from '../../components/ui/Layout';
import { MOCK_LOGS, MOCK_APPS } from '../../lib/mockData';
import { cn } from '../../lib/utils';

export default function LogsPage() {
  const [selectedApp, setSelectedApp] = React.useState('all');
  const [isStreaming, setIsStreaming] = React.useState(true);

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-140px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Logs</h1>
          <p className="text-slate-500">Consolidated logs for all your running applications and services.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsStreaming(!isStreaming)}>
            {isStreaming ? <PauseCircle className="w-4 h-4 mr-2" /> : <PlayCircle className="w-4 h-4 mr-2" />}
            {isStreaming ? 'Pause Stream' : 'Resume Stream'}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 overflow-hidden border-slate-200 dark:border-slate-800">
        {/* Controls */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-wrap gap-4 shrink-0">
          <select 
            className="h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium w-full sm:w-48"
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
          >
            <option value="all">All Applications</option>
            {MOCK_APPS.map(app => (
              <option key={app.id} value={app.id}>{app.name}</option>
            ))}
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Filter logs (e.g. status:500, label:error)" className="pl-10 h-10" />
          </div>
          <Button variant="outline" size="sm" className="h-10 px-4">
            <Filter className="w-4 h-4 mr-2" />
            Select Levels
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 text-red-400">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Viewer */}
        <div className="flex-1 overflow-y-auto bg-slate-950 p-6 font-mono text-xs leading-relaxed">
          {MOCK_LOGS.concat(MOCK_LOGS, MOCK_LOGS).map((log, i) => {
            const app = MOCK_APPS[i % MOCK_APPS.length];
            return (
              <div key={i} className="flex gap-6 group hover:bg-white/5 py-0.5 px-2 -mx-2 rounded">
                <span className="text-slate-600 shrink-0 w-32">{log.timestamp}</span>
                <span className="text-indigo-400 font-bold shrink-0 w-24 truncate">[{app.name}]</span>
                <span className={cn(
                  "font-bold shrink-0 w-12",
                  log.level === 'ERROR' ? 'text-red-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-emerald-400'
                )}>{log.level}</span>
                <span className="text-slate-300 break-all">{log.message}</span>
              </div>
            );
          })}
          {isStreaming && (
            <div className="flex gap-6 py-0.5 px-2 -mx-2 rounded animate-pulse">
              <span className="text-slate-600 shrink-0 w-32">2026-04-17 14:44:02</span>
              <span className="text-indigo-400 font-bold shrink-0 w-24 truncate">[api-service]</span>
              <span className="text-emerald-400 font-bold shrink-0 w-12">INFO</span>
              <span className="text-white">New connection from 182.23.11.4 - processing...</span>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="p-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 shrink-0">
          <div className="flex gap-4">
            <span>Server: us-east-1a</span>
            <span>Buffered: 120 lines</span>
            <span>Speed: 4.2 req/s</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("w-1.5 h-1.5 rounded-full", isStreaming ? "bg-emerald-500 animate-pulse" : "bg-slate-400")} />
            {isStreaming ? 'Streaming Live' : 'Streaming Paused'}
          </div>
        </div>
      </Card>
    </div>
  );
}
