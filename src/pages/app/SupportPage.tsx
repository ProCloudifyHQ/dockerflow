import React from 'react';
import { HelpCircle, Book, MessageSquare, ExternalLink, Search, Mail, ChevronRight, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Input } from '../../components/ui/Layout';

export default function SupportPage() {
  const faqs = [
    { q: 'How do I deploy a private Docker image?', a: 'You can add registry credentials in the "Registry Access" section under account settings.' },
    { q: 'What is the idle timeout for apps?', a: 'By default, apps do not sleep. You can manually pause apps from the dashboard.' },
    { q: 'Can I use a custom domain?', a: 'Yes, in the Domains tab of your app, you can add any domain you own.' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">How can we help?</h1>
        <p className="text-slate-500 text-lg">Search our knowledge base or get in touch with our team.</p>
        <div className="relative max-w-2xl mx-auto mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search documentation, tutorials, and common issues..." 
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Book, title: 'Documentation', desc: 'Step-by-step guides on how to use DockerFlow features.', color: 'text-blue-500' },
          { icon: Zap, title: 'Quick Start', desc: 'Deploy your first app in less than 5 minutes with our guide.', color: 'text-amber-500' },
          { icon: MessageSquare, title: 'Community Forum', desc: 'Connect with other developers and share patterns.', color: 'text-emerald-500' },
        ].map((item) => (
          <Card key={item.title} className="hover:border-indigo-500 transition-colors cursor-pointer group">
            <CardContent className="p-8 text-center">
              <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 mb-6">{item.desc}</p>
              <Button variant="ghost" size="sm" className="font-bold underline text-indigo-600">Browse {item.title}</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <button className="w-full p-6 text-left flex justify-between items-center group">
                  <span className="font-bold">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </button>
              </Card>
            ))}
          </div>
          <Button variant="ghost" className="text-indigo-600 font-bold">View all FAQs</Button>
        </div>

        <Card className="bg-indigo-600 border-none shadow-2xl">
          <CardContent className="p-8 text-white space-y-6">
            <h2 className="text-2xl font-bold">Still need help?</h2>
            <p className="text-indigo-100">Our support engineers are ready to assist you with any technical implementation questions.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                <Mail className="w-6 h-6" />
                <div>
                  <p className="text-sm font-bold">Email Support</p>
                  <p className="text-xs text-indigo-200">Response within 2-4 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                <HelpCircle className="w-6 h-6" />
                <div>
                  <p className="text-sm font-bold">Live Chat</p>
                  <p className="text-xs text-indigo-200">Available Mon-Fri 9am-6pm</p>
                </div>
              </div>
            </div>
            <Button className="w-full bg-white text-indigo-600 hover:bg-slate-100 h-12 text-lg">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
