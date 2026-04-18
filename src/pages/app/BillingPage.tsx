import React from 'react';
import { CreditCard, Check, AlertCircle, TrendingUp, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Badge } from '../../components/ui/Layout';

export default function BillingPage() {
  const invoices = [
    { id: 'INV-001', date: 'Apr 1, 2026', amount: '$5.00', status: 'Paid' },
    { id: 'INV-002', date: 'Mar 1, 2026', amount: '$5.00', status: 'Paid' },
    { id: 'INV-003', date: 'Feb 1, 2026', amount: '$12.40', status: 'Paid' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing & Subscriptions</h1>
        <p className="text-slate-500">Manage your payment methods and view your usage history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Current Plan */}
        <Card className="md:col-span-2">
          <CardHeader className="flex justify-between items-center border-b pb-4">
            <h3 className="font-bold">Current Plan</h3>
            <Badge variant="success">Active</Badge>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div>
                <p className="text-2xl font-extrabold text-indigo-600">Starter Plan</p>
                <p className="text-sm text-slate-500 mt-1">Billed monthly at $5/month</p>
                <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-4">
                  {[
                    'Up to 3 Applications',
                    '512MB RAM per App',
                    '0.5 vCPU per App',
                    'Standard Monitoring'
                  ].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-4 h-4 text-emerald-500" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 shrink-0">
                <Button className="w-full">Upgrade Plan</Button>
                <Button variant="outline" className="w-full">Cancel Subscription</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <h3 className="font-bold">Payment Method</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl mb-6">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-bold">Visa ending in 4242</p>
                <p className="text-xs text-slate-500">Expires 12/28</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">Edit Payment</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Usage Summary */}
        <Card>
          <CardHeader className="flex items-center justify-between border-b pb-4 text-sm">
            <h3 className="font-bold">Usage Estimator</h3>
            <span className="text-slate-500">Current Period: Apr 1 - Apr 30</span>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Bandwidth (1.2GB / 100GB)</span>
                <span className="font-bold">Free</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[1%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Active Apps (3 / 3)</span>
                <span className="font-bold">Maxed</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[100%]" />
              </div>
            </div>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800 rounded-xl flex gap-3 text-sm">
              <TrendingUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <p className="text-indigo-800 dark:text-indigo-400">You've reached your app limit. Upgrade to <b>Growth</b> to deploy more.</p>
            </div>
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <h3 className="font-bold">Recent Invoices</h3>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="px-6 py-3">Invoice ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {invoices.map(inv => (
                  <tr key={inv.id}>
                    <td className="px-6 py-4 font-medium">{inv.id}</td>
                    <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                    <td className="px-6 py-4 font-bold">{inv.amount}</td>
                    <td className="px-6 py-4">
                      <Badge variant="success">{inv.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
