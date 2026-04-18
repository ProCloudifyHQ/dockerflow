import React from 'react';
import { Users, Mail, Plus, Shield, MoreVertical } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Badge, Input } from '../../components/ui/Layout';
import { MOCK_TEAM } from '../../lib/mockData';

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <p className="text-slate-500">Invite and manage collaborators for your DockerFlow projects.</p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="border-b px-6 py-4">
              <h3 className="font-bold">Team Members</h3>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {MOCK_TEAM.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800" />
                          <span className="font-bold text-slate-900 dark:text-white">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={member.role === 'Owner' || member.role === 'Admin' ? 'info' : 'neutral'}>
                          {member.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{member.email}</td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <h3 className="font-bold text-sm">Role Definitions</h3>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-indigo-600">Admin</p>
                <p className="text-xs text-slate-500">Can manage apps, members, and settings. No billing access.</p>
              </div>
              <div className="space-y-1 border-t border-slate-100 dark:border-slate-800 pt-3">
                <p className="text-xs font-bold text-emerald-600">Developer</p>
                <p className="text-xs text-slate-500">Can view and deploy apps, view logs and metrics.</p>
              </div>
              <div className="space-y-1 border-t border-slate-100 dark:border-slate-800 pt-3">
                <p className="text-xs font-bold text-amber-600">Billing</p>
                <p className="text-xs text-slate-500">Can view invoices, manage payment methods and plan.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-bold text-sm">Security Policy</h3>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex gap-3 mb-4">
                <Shield className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <p className="text-xs text-slate-500">Require 2FA for all team members to access production apps.</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">Enable Enforcement</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
