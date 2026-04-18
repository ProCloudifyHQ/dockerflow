import React from 'react';
import { 
  Globe, 
  Plus, 
  Shield, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Search,
  Info
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Badge, Input } from '../../components/ui/Layout';
import { MOCK_DOMAINS } from '../../lib/mockData';

export default function DomainsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Custom Domains</h1>
          <p className="text-slate-500">Manage global domains that can be mapped to your applications.</p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Add Custom Domain
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Filter domains..." className="pl-10 h-10" />
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400"><RefreshCw className="w-4 h-4" /></Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Domain</th>
                    <th className="px-6 py-4">Application</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">SSL</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {MOCK_DOMAINS.map((domain) => (
                    <tr key={domain.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-bold flex items-center gap-2">
                          {domain.domain}
                          <ExternalLink className="w-3 h-3 text-slate-300" />
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-medium text-indigo-600">api-service</span>
                      </td>
                      <td className="px-6 py-5">
                        <Badge variant={domain.status === 'Active' ? 'success' : 'warning'}>
                          {domain.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs">
                          <Shield className="w-3 h-3" />
                          {domain.ssl === 'Enabled' ? 'Issued' : 'Pending'}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-red-400" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-slate-900 text-white border-none shadow-xl">
            <CardHeader>
              <h3 className="font-bold text-indigo-400 flex items-center gap-2">
                <Info className="w-4 h-4" />
                DNS Instructions
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-4 font-mono text-xs">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-slate-500 mb-2 uppercase font-bold tracking-widest">Type</p>
                <p className="text-white">CNAME</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-slate-500 mb-2 uppercase font-bold tracking-widest">Host / Name</p>
                <p className="text-white">www or @</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-slate-500 mb-2 uppercase font-bold tracking-widest">Value / Target</p>
                <p className="text-indigo-300">ingress.dockerflow.io</p>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-sans mt-4">
                DNS changes can take up to 24 hours to propagate globally. We will automatically provision an SSL certificate once the domain is verified.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
