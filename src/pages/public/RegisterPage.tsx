import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Github, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, Input } from '../../components/ui/Layout';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">DockerFlow</span>
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight">Create your account</h1>
          <p className="text-slate-500 mt-2">Start deploying Docker apps in seconds</p>
        </div>

        <Card className="p-8 shadow-xl border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button variant="outline" className="w-full h-11">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full h-11">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold">Or use your email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input type="text" placeholder="John Doe" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input type="email" placeholder="name@company.com" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>
            <div className="pt-4 space-y-4">
              <p className="text-xs text-slate-500">
                By clicking Sign Up, you agree to our <Link to="#" className="text-indigo-600 font-bold hover:underline">Terms of Service</Link> and <Link to="#" className="text-indigo-600 font-bold hover:underline">Privacy Policy</Link>.
              </p>
              <Button type="submit" className="w-full h-12 text-lg">
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </form>

          <div className="mt-8 flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs text-emerald-800 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <span>No credit card required to start. 14-day free trial on Growth plan included.</span>
          </div>
        </Card>

        <p className="text-center mt-8 text-sm text-slate-500 font-medium">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
