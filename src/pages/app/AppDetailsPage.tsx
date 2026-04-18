import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  RefreshCw, 
  Play, 
  Pause, 
  Terminal, 
  GitBranch, 
  Globe, 
  Settings, 
  Activity, 
  HardDrive, 
  History, 
  ExternalLink,
  ChevronRight,
  Shield,
  Clock,
  Trash2,
  Lock,
  Plus
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Badge, Input } from '../../components/ui/Layout';
import { useToast } from '../../components/ui/Toast';
import { cn } from '../../lib/utils';
import { MOCK_APPS, MOCK_DEPLOYMENTS, MOCK_LOGS, MOCK_METRICS, MOCK_DOMAINS, MOCK_ENV_VARS } from '../../lib/mockData';

export default function AppDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const { showToast } = useToast();
  
  const app = MOCK_APPS.find(a => a.id === id) || MOCK_APPS[0];

  const handleAction = (action: string) => {
    showToast(`${action} command sent for ${app.name}`, 'info');
    setTimeout(() => {
      showToast(`${app.name} has been ${action.toLowerCase()}ed successfully`, 'success');
    }, 1500);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Box },
    { id: 'deployments', label: 'Deployments', icon: GitBranch },
    { id: 'logs', label: 'Logs', icon: Terminal },
    { id: 'domains', label: 'Domains', icon: Globe },
    { id: 'env', label: 'Environment', icon: Lock },
    { id: 'storage', label: 'Storage', icon: HardDrive },
    { id: 'backups', label: 'Backups', icon: History },
    { id: 'metrics', label: 'Metrics', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Status Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                          <Box className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold">{app.name}</h2>
                            <Badge variant="success">Active</Badge>
                          </div>
                          <a href={`https://${app.domain}`} target="_blank" className="text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1 mt-1 transition-colors">
                            {app.domain}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={() => handleAction('Restart')}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Restart
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAction('Pause')}>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </Button>
                        <Button size="sm" onClick={() => handleAction('Redeploy')}>
                          Redeploy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Metrics Preview */}
                <Card>
                  <CardHeader className="flex items-center justify-between border-b px-6 py-4">
                    <h3 className="font-bold">Resource Usage (Last 6h)</h3>
                    <Link to="#" onClick={() => setActiveTab('metrics')} className="text-xs text-indigo-600 font-bold hover:underline">Full Analytics</Link>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_METRICS}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="time" hide />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="cpu" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Avg CPU</p>
                        <p className="text-xl font-bold">34%</p>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Avg Memory</p>
                        <p className="text-xl font-bold">1.2 GB</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <h3 className="font-bold">App Info</h3>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Region</span>
                      <span className="font-medium">{app.region}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Resource Plan</span>
                      <span className="font-medium text-indigo-600">{app.plan}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Runtime</span>
                      <span className="font-medium">{app.runtime}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Created</span>
                      <span className="font-medium">Apr 12, 2026</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex items-center justify-between">
                    <h3 className="font-bold">Recent Activity</h3>
                    <Link to="#" onClick={() => setActiveTab('deployments')} className="text-xs text-indigo-600 font-bold hover:underline">View All</Link>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    {MOCK_DEPLOYMENTS.slice(0, 3).map((d) => (
                      <div key={d.id} className="flex gap-3">
                        <div className="mt-1">
                          <div className={cn("w-2 h-2 rounded-full", d.status === 'success' ? 'bg-emerald-500' : 'bg-red-500')} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{d.commit}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-tight">{d.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 'deployments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Deployments</h2>
              <Button size="sm">Trigger Deploy</Button>
            </div>
            <Card className="overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 font-bold uppercase text-[10px] tracking-widest text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Commit</th>
                    <th className="px-6 py-4">Brach</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {MOCK_DEPLOYMENTS.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <td className="px-6 py-4">
                        <Badge variant={d.status === 'success' ? 'success' : d.status === 'failed' ? 'error' : 'info'}>
                          {d.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-medium">{d.commit}</td>
                      <td className="px-6 py-4 text-slate-500">{d.source}</td>
                      <td className="px-6 py-4 text-slate-500">{d.timestamp}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="text-indigo-600 font-bold">Rollback</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        );

      case 'logs':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Runtime Logs</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Clear</Button>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
            <div className="bg-slate-950 rounded-xl p-6 font-mono text-xs text-slate-300 h-[600px] overflow-y-auto space-y-1 shadow-inner border border-slate-800">
              {MOCK_LOGS.concat(MOCK_LOGS).map((log, i) => (
                <div key={i} className="flex gap-4 group">
                  <span className="text-slate-600 flex-shrink-0">{log.timestamp}</span>
                  <span className={cn(
                    "font-bold flex-shrink-0 w-12",
                    log.level === 'ERROR' ? 'text-red-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-indigo-400'
                  )}>{log.level}</span>
                  <span className="text-slate-200">{log.message}</span>
                </div>
              ))}
              <div className="flex gap-4 animate-pulse">
                <span className="text-slate-600">2026-04-17 14:35:12</span>
                <span className="text-indigo-400 font-bold w-12 text-center">LISTEN</span>
                <span className="text-indigo-500">Waiting for connections...</span>
              </div>
            </div>
          </div>
        );

      case 'domains':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Domain Management</h2>
              <Button size="sm">Add Domain</Button>
            </div>
            <Card>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 font-bold uppercase text-[10px] tracking-widest text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Domain</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">SSL</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {MOCK_DOMAINS.map((domain) => (
                    <tr key={domain.id}>
                      <td className="px-6 py-4 font-medium">{domain.domain}</td>
                      <td className="px-6 py-4 text-slate-500">{domain.type}</td>
                      <td className="px-6 py-4">
                        <Badge variant={domain.status === 'Active' ? 'success' : 'warning'}>{domain.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={domain.ssl === 'Enabled' ? 'info' : 'neutral'}>
                          <Shield className="w-3 h-3 mr-1" />
                          {domain.ssl}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        );

      case 'env':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Environment Variables</h2>
              <Button size="sm">Add Variable</Button>
            </div>
            <Card>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_ENV_VARS.map((v) => (
                  <div key={v.id} className="p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-8 flex-1">
                      <div className="w-1/3">
                        <p className="text-xs font-bold uppercase text-slate-400 mb-1">Key</p>
                        <p className="font-mono text-sm">{v.key}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase text-slate-400 mb-1">Value</p>
                        <div className="flex items-center gap-2">
                          {v.secret ? (
                            <div className="flex gap-1.5">
                              {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />)}
                            </div>
                          ) : (
                            <p className="font-mono text-sm">{v.value}</p>
                          )}
                          {v.secret && <Lock className="w-3 h-3 text-slate-400" />}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-red-400" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <h3 className="font-bold">General Settings</h3>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1.5">App Name</label>
                    <Input defaultValue={app.name} />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5">Environment</label>
                    <Badge variant="info" className="py-2 w-full justify-center">Production</Badge>
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="border-red-200 dark:border-red-900/30">
                <CardHeader className="bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-400">
                  <h3 className="font-bold">Danger Zone</h3>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Permanently delete this app and all associated data. This action cannot be undone.</p>
                  <Button variant="danger" className="w-full">Delete Application</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-20 text-center text-slate-500">
            <Box className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>This section is coming soon in the prototype.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/apps" className="hover:text-indigo-600">Apps</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 dark:text-white font-medium">{app.name}</span>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all flex items-center gap-2",
                activeTab === tab.id 
                  ? "border-indigo-600 text-indigo-600" 
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-200 dark:hover:border-slate-800"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {renderTabContent()}
      </div>
    </div>
  );
}
