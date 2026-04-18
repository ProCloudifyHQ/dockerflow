import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Mail, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, Input } from '../../components/ui/Layout';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <h1 className="text-2xl font-extrabold tracking-tight">
            {submitted ? "Check your email" : "Reset your password"}
          </h1>
          <p className="text-slate-500 mt-2">
            {submitted 
              ? "We've sent password reset instructions to your email address." 
              : "Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        <Card className="p-8 shadow-xl border-slate-200 dark:border-slate-800">
          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input type="email" placeholder="name@company.com" className="pl-10" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-lg">
                Send Reset Link
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
                <Mail className="w-8 h-8" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Resend Email
              </Button>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline">
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
