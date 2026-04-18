import React from 'react';
import { User, Lock, Bell, Palette, Globe, Shield, Trash2, Key, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Input } from '../../components/ui/Layout';
import { cn } from '../../lib/utils';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <h3 className="font-bold">Public Profile</h3>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <img src="https://picsum.photos/seed/user/100/100" className="w-20 h-20 rounded-2xl" alt="Avatar" />
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-xs text-slate-500">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input defaultValue="Alex Johnson" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input defaultValue="alex@example.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea className="w-full h-24 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none" placeholder="Tell us about yourself..." />
                </div>
                <Button>Update Profile</Button>
              </CardContent>
            </Card>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <h3 className="font-bold">Change Password</h3>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input type="password" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>
            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-900/30">
               <CardContent className="p-6 flex justify-between items-center">
                 <div>
                   <h4 className="font-bold text-amber-900 dark:text-amber-400">Two-Factor Authentication</h4>
                   <p className="text-sm text-amber-700 dark:text-amber-500">Add an extra layer of security to your account.</p>
                 </div>
                 <Button variant="secondary">Enable 2FA</Button>
               </CardContent>
            </Card>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Personal Access Tokens</h3>
              <Button size="sm"><Plus className="w-4 h-4 mr-2" />New Token</Button>
            </div>
            <Card>
              <div className="p-6 text-center py-12">
                 <Key className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                 <p className="text-slate-500">You haven't created any API keys yet.</p>
              </div>
            </Card>
          </div>
        );
      default:
        return <div className="p-12 text-center text-slate-500">Content for {activeTab} is coming soon.</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Account Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-1 flex-shrink-0">
          {tabs.map(tab => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                activeTab === tab.id 
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400" 
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
             <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
               <Trash2 className="w-4 h-4" />
               Delete Account
             </button>
          </div>
        </aside>

        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
