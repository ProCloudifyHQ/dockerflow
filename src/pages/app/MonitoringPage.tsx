import React from 'react';
import { 
  BarChart3, 
  Activity, 
  Cpu, 
  Globe, 
  Zap, 
  ChevronDown, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Badge } from '../../components/ui/Layout';
import { MOCK_METRICS } from '../../lib/mockData';
import { cn } from '../../lib/utils';

export default function MonitoringPage() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Infrastructure Monitoring</h1>
          <p className="text-slate-500">Real-time performance metrics across your global container fleet.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 24 Hours
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button size="sm">
            <Zap className="w-4 h-4 mr-2" />
            Live View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Network In', value: '42.1 GB', icon: Globe, status: '+12%', color: 'text-indigo-600' },
          { label: 'Network Out', value: '156.4 GB', icon: Globe, status: '+5%', color: 'text-blue-600' },
          { label: 'Requests', value: '1.2M', icon: Activity, status: '-2%', color: 'text-emerald-600' },
          { label: 'Error Rate', value: '0.04%', icon: AlertCircle, status: 'Normal', color: 'text-amber-600' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-[10px] font-bold mt-1 text-emerald-500">{stat.status}</p>
                </div>
                <stat.icon className={`w-5 h-5 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-500" />
              Aggregate CPU Utilization
            </h3>
            <Badge variant="info">All Regions</Badge>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_METRICS}>
                  <defs>
                    <linearGradient id="colorCpuFull" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" fontSize={11} stroke="#94A3B8" axisLine={false} tickLine={false} />
                  <YAxis fontSize={11} stroke="#94A3B8" axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="cpu" stroke="#6366f1" fillOpacity={1} fill="url(#colorCpuFull)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              Memory Allocation (GB)
            </h3>
            <Badge variant="info">Global</Badge>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_METRICS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" fontSize={11} stroke="#94A3B8" axisLine={false} tickLine={false} />
                  <YAxis fontSize={11} stroke="#94A3B8" axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="ram" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="border-b px-6 py-4">
          <h3 className="font-bold flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            Regional Latency & Performance
          </h3>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Health</th>
                <th className="px-6 py-4">P99 Latency</th>
                <th className="px-6 py-4">Requests / Sec</th>
                <th className="px-6 py-4">Resource Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { name: 'us-east-1 (N. Virginia)', health: 'Healthy', latency: '42ms', rps: '1,240 rps', load: 45 },
                { name: 'eu-central-1 (Frankfurt)', health: 'Healthy', latency: '12ms', rps: '450 rps', load: 12 },
                { name: 'ap-southeast-1 (Singapore)', health: 'Partial Outage', latency: '240ms', rps: '210 rps', load: 88 }
              ].map(reg => (
                <tr key={reg.name} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                  <td className="px-6 py-4 font-bold">{reg.name}</td>
                  <td className="px-6 py-4">
                    <Badge variant={reg.health === 'Healthy' ? 'success' : 'error'}>{reg.health}</Badge>
                  </td>
                  <td className="px-6 py-4 font-mono">{reg.latency}</td>
                  <td className="px-6 py-4">{reg.rps}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={cn("h-full", reg.load > 80 ? "bg-red-500" : "bg-indigo-500")} style={{ width: `${reg.load}%` }} />
                      </div>
                      <span className="text-[10px] font-bold">{reg.load}%</span>
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
