import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-12">
        <div className="w-24 h-24 rounded-3xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-8 animate-bounce">
          <Box className="w-12 h-12 text-slate-300" />
        </div>
        <h1 className="text-8xl font-black text-slate-900 dark:text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page not found</h2>
        <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">
          Oops! The page you are looking for doesn't exist or has been moved to another cluster.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/dashboard">
          <Button size="lg" className="h-14 px-8 text-lg">
            <Home className="mr-2 w-5 h-5" />
            Go to Dashboard
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="mt-20 max-w-lg w-full">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Try searching for settings or apps..." 
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
        </div>
      </div>
    </div>
  );
}
