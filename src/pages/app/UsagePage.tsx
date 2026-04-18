import React from 'react';
import { 
  BarChart3, 
  Cpu, 
  Activity, 
  HardDrive, 
  Globe, 
  TrendingUp,
  Download,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Badge } from '../../components/ui/Layout';
import { MOCK_APPS } from '../../lib/mockData';

export default function UsagePage() {
  const data = MOCK_APPS.map(app => ({
    name: app.name,
    usage: Math.floor(Math.random() * 80) + 10,
    color: app.status === 'running' ? '#6366f1' : '#94a3b8'
  }));

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resource Consumption</h1>
          <p className="text-slate-500">Breakdown of CPU, RAM, and bandwidth usage across your apps.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Usage Report
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            April 2026
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader className="flex justify-between items-center border-b px-6 py-4">
            <h3 className="font-bold">Usage by Application (%)</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" fontSize={12} width={100} stroke="#94A3B8" />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="usage" radius={[0, 4, 4, 0]} barSize={24}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h3 className="font-bold">Monthly Quotas</h3>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>Bandwidth</span>
                  <span className="text-slate-900 dark:text-white">4.2 GB / 100 GB</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[4.2%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>Total Managed Storage</span>
                  <span className="text-slate-900 dark:text-white">125 GB / 250 GB</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[50%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>SSL Certificates</span>
                  <span className="text-slate-900 dark:text-white">8 / 20</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[40%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white border-none shadow-xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                <h4 className="font-bold">Efficiency Insight</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                App <b>"data-analyzer"</b> is currently using 20% more RAM than usual. Consider optimizing the image or upgrading the instance type to avoid OOM failures.
              </p>
              <Button size="sm" variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white">
                Optimize App
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
