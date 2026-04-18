import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Activity, 
  Cpu, 
  Database, 
  Zap, 
  ExternalLink, 
  Plus, 
  Search,
  ChevronRight,
  GitBranch, 
  Terminal,
  Globe
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Badge } from '../../components/ui/Layout';
import { MOCK_APPS, MOCK_METRICS, MOCK_DEPLOYMENTS, MOCK_LOGS } from '../../lib/mockData';

export default function Dashboard() {
  const stats = [
    { label: 'Total Apps', value: '12', icon: Box, color: 'text-foreground', bg: 'bg-secondary' },
    { label: 'Running', value: '10', icon: Zap, color: 'text-foreground', bg: 'bg-secondary' },
    { label: 'CPU Usage', value: '24%', icon: Cpu, color: 'text-foreground', bg: 'bg-secondary' },
    { label: 'RAM Usage', value: '3.2 GB', icon: Activity, color: 'text-foreground', bg: 'bg-secondary' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Hero */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, ProCloudify</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here is what is happening with your infrastructure today.</p>
        </div>
        <Link to="/apps/new">
          <Button size="lg" className="shadow-lg shadow-primary/20">
            <Plus className="w-5 h-5 mr-2" />
            Create New App
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-bold">Infrastructure Load</h3>
            <div className="flex gap-2">
              <Badge variant="info">CPU</Badge>
              <Badge>RAM</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 w-full font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_METRICS}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          {/* Quick Tasks */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">Quick Actions</h3>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4" />
                  Create Postgres DB
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4" />
                  Add Custom Domain
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
                <div className="flex items-center gap-3">
                  <GitBranch className="w-4 h-4" />
                  Invite Collaborator
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </CardContent>
          </Card>

          {/* Activity Mini */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Recent Deployments</h3>
              <Link to="/deployments" className="text-xs text-primary font-medium hover:underline">View All</Link>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {MOCK_DEPLOYMENTS.slice(0, 3).map((d) => (
                <div key={d.id} className="flex gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full ${d.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[180px]">{d.commit}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">api-service • {d.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Running Apps Table Mini */}
      <Card>
        <CardHeader className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-bold">Recently Active Apps</h3>
          <Link to="/apps">
            <Button variant="ghost" size="sm" className="text-indigo-600">View All Apps</Button>
          </Link>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-medium uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-3">App Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Usage</th>
                <th className="px-6 py-3">Last Deploy</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_APPS.slice(0, 4).map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-white">{app.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{app.domain}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={app.status === 'running' ? 'success' : app.status === 'deploying' ? 'info' : 'neutral'}>
                      {app.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-3 h-3 text-slate-400" />
                        <span>{app.cpu}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Activity className="w-3 h-3 text-slate-400" />
                        <span>{app.ram}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{app.lastDeploy}</td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/apps/${app.id}`}>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
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
