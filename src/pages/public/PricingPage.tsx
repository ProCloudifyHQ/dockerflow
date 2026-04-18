import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Box, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Layout';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$5',
      desc: 'Perfect for side projects and learning.',
      features: ['0.5 vCPU', '512 MB RAM', '10 GB SSD', 'Shared IP', 'Standard Logs', 'Community Support'],
      button: 'Start for Free',
      variant: 'outline'
    },
    {
      name: 'Growth',
      price: '$20',
      desc: 'Great for small businesses and scaling apps.',
      features: ['1 vCPU', '2 GB RAM', '50 GB SSD', 'Custom Domains', 'Auto SSL', '7 Days Backups', 'Email Support'],
      button: 'Scale Now',
      variant: 'primary',
      highlight: true
    },
    {
      name: 'Pro',
      price: '$50',
      desc: 'Advanced features for enterprise workloads.',
      features: ['2 vCPU', '4 GB RAM', '100 GB SSD', 'Dedicated IP', 'Advanced Metrics', '30 Days Backups', '24/7 Priority Support'],
      button: 'Go Pro',
      variant: 'outline'
    },
    {
      name: 'Business',
      price: '$120+',
      desc: 'Custom infrastructure for large teams.',
      features: ['Custom CPU/RAM', 'TB Level SSD', 'Global Anycast', 'PCI Compliance', 'Managed Migration', 'Dedicated Success Manager'],
      button: 'Contact Sales',
      variant: 'outline'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      <nav className="border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <Box className="w-6 h-6 text-indigo-600" />
          <span className="font-bold text-lg">DockerFlow</span>
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Simple, Predictable Pricing</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12">
          Deploy any Docker container in seconds. No hidden fees. Pay only for what you use as you scale.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <span className="text-sm font-medium">Monthly</span>
          <div className="w-12 h-6 bg-slate-200 dark:bg-slate-800 rounded-full relative cursor-pointer p-1">
            <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
          <span className="text-sm font-medium text-slate-400">Yearly <span className="text-emerald-500 font-bold">(20% Off)</span></span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative flex flex-col ${plan.highlight ? 'border-indigo-600 ring-1 ring-indigo-600' : ''}`}>
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="p-8 flex-1">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-slate-500">/mo</span>
                </div>
                <p className="text-sm text-slate-500 mb-8">{plan.desc}</p>
                <ul className="space-y-4 text-left mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0">
                <Link to="/register">
                  <Button variant={plan.variant as any} className="w-full">
                    {plan.button}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-20 p-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Need something bigger?</h2>
            <p className="text-slate-500">We offer custom clusters for high-traffic applications. Get dedicated hosting with custom resource limits and enterprise-grade SLA.</p>
          </div>
          <Button size="lg" className="h-14 px-8">
            Talk to an Expert
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
