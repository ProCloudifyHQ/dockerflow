import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  ChevronRight, 
  Github, 
  Terminal, 
  Zap, 
  Globe, 
  Shield, 
  Cpu, 
  Server,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Header */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <Box className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">DockerFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/pricing" className="text-sm font-medium hover:text-foreground">Pricing</Link>
            <a href="#" className="text-sm font-medium hover:text-foreground">Docs</a>
            <a href="#" className="text-sm font-medium hover:text-foreground">Templates</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-foreground">Login</Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3" />
              Now in Public Beta
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Deploy Docker Apps <span className="text-primary/80">Easily</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-xl">
              Focus on your code, we handle the infrastructure. Managed shared Docker hosting designed for modern developers and agile teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="h-14 px-8 text-lg">
                  Deploy Your First App
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                <Terminal className="mr-2 w-5 h-5" />
                View Demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-600/20 blur-3xl rounded-full" />
            <div className="relative bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden transform md:rotate-2">
              <div className="flex items-center gap-2 p-3 bg-slate-800/50 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-auto text-xs font-mono text-slate-500 uppercase tracking-widest">Deploying...</div>
              </div>
              <div className="p-6 font-mono text-sm text-muted-foreground space-y-2">
                <div className="flex gap-4">
                  <span className="text-slate-600">$</span>
                  <span>git push dockerflow main</span>
                </div>
                <div className="text-slate-300">Counting objects: 100% (52/52), done.</div>
                <div className="text-slate-300">Writing objects: 100% (52/52), 4.29 KiB | 2.15 MiB/s, done.</div>
                <div className="text-muted-foreground">{'----->'} Building Docker image...</div>
                <div className="text-green-400">{'----->'} Image built successfully. (v2.1.0)</div>
                <div className="text-muted-foreground">{'----->'} Deploying to us-east-1...</div>
                <div className="text-green-500 font-bold">{'----->'} App is live at webapp-82u.dockerflow.dev!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Scale</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Skip the server configuration and Kubernetes complexity. Just provide a Dockerfile or a Compose file and we do the rest.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Edge Network', desc: 'Deploy to multiple regions worldwide for lower latency.' },
              { icon: Shield, title: 'Auto SSL', desc: 'Every app gets free automated Let\'s Encrypt SSL certificates.' },
              { icon: Cpu, title: 'Resource Scaling', desc: 'Scale CPU and RAM vertically as your application grows.' },
              { icon: Server, title: 'Persistent Volumes', desc: 'Attach high-performance SSD storage to your containers.' },
              { icon: Github, title: 'Git Integration', desc: 'Sync with GitHub, GitLab or Bitbucket for auto-deploys.' },
              { icon: Terminal, title: 'Live Logs', desc: 'Monitor your application performance with real-time logging.' },
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Box className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">DockerFlow</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Cookie Policy</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
          <p className="text-sm text-slate-500">© 2026 DockerFlow Inc.</p>
        </div>
      </footer>
    </div>
  );
}
