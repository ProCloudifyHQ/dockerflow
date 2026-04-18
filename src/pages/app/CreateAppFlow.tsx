import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Github, 
  Box, 
  Layers, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Globe, 
  Info,
  Server,
  Zap,
  Lock,
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, Input, Badge } from '../../components/ui/Layout';
import { cn } from '../../lib/utils';

type Step = 'source' | 'config' | 'build' | 'env' | 'review';

export default function CreateAppFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('source');
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    source: 'github',
    name: '',
    region: 'us-east-1',
    plan: 'starter',
    branch: 'main',
    port: '3000',
    envVars: [{ key: '', value: '', isSecret: false }]
  });

  const steps: { key: Step; label: string }[] = [
    { key: 'source', label: 'Source' },
    { key: 'config', label: 'Configuration' },
    { key: 'build', label: 'Build Settings' },
    { key: 'env', label: 'Environment' },
    { key: 'review', label: 'Review' },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === step);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex].key);
    } else {
      handleDeploy();
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex].key);
    } else {
      navigate('/apps');
    }
  };

  const handleDeploy = () => {
    setLoading(true);
    // Simulate deployment delay
    setTimeout(() => {
      setLoading(false);
      navigate('/apps/1'); // Redirect to app details
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 'source':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Choose your source</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'github', title: 'GitHub', icon: Github, desc: 'Deploy directly from your repository' },
                { id: 'docker', title: 'Docker Image', icon: Box, desc: 'Pull from Docker Hub or private registry' },
                { id: 'compose', title: 'Docker Compose', icon: Layers, desc: 'Multi-container application' },
                { id: 'template', title: 'Template', icon: Zap, desc: 'Start from a pre-configured template' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFormData({ ...formData, source: opt.id })}
                  className={cn(
                    "flex items-start gap-4 p-6 rounded-xl border-2 text-left transition-all",
                    formData.source === opt.id 
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10" 
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-lg",
                    formData.source === opt.id ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  )}>
                    <opt.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{opt.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{opt.desc}</p>
                  </div>
                  {formData.source === opt.id && <Check className="w-5 h-5 text-indigo-600 ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        );

      case 'config':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">App Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">App Name</label>
                <Input 
                  placeholder="my-awesome-app" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Your app will be at {formData.name || 'app'}.dockerflow.dev
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Region</label>
                  <select 
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  >
                    <option value="us-east-1">US East (N. Virginia)</option>
                    <option value="eu-central-1">EU (Frankfurt)</option>
                    <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Runtime</label>
                  <Badge variant="info" className="h-10 px-4 w-full justify-center">Docker (Auto-detected)</Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Choose a resource plan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'starter', name: 'Starter', price: '$5/mo', cpu: '0.5 vCPU', ram: '512MB' },
                  { id: 'growth', name: 'Growth', price: '$20/mo', cpu: '1 vCPU', ram: '2GB' },
                  { id: 'pro', name: 'Pro', price: '$50/mo', cpu: '2 vCPU', ram: '4GB' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setFormData({ ...formData, plan: p.id })}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all",
                      formData.plan === p.id 
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10" 
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{p.name}</span>
                      <span className="text-sm font-medium text-indigo-600">{p.price}</span>
                    </div>
                    <div className="text-xs text-slate-500 space-y-1">
                      <p>{p.cpu}</p>
                      <p>{p.ram}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'build':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Build & Deploy Settings</h2>
            <Card className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Branch</label>
                  <Input 
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Port</label>
                  <Input 
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Docker Build Context</label>
                <Input placeholder="/" defaultValue="." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Dockerfile Path</label>
                <Input placeholder="./Dockerfile" defaultValue="./Dockerfile" />
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-3 font-medium cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
                  Auto-deploy on git push
                </label>
              </div>
            </Card>
          </div>
        );

      case 'env':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Environment Variables</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFormData({ 
                  ...formData, 
                  envVars: [...formData.envVars, { key: '', value: '', isSecret: false }] 
                })}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Variable
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.envVars.map((v, i) => (
                <div key={i} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Key</label>
                    <Input 
                      placeholder="e.g. API_KEY" 
                      value={v.key}
                      onChange={(e) => {
                        const newVars = [...formData.envVars];
                        newVars[i].key = e.target.value;
                        setFormData({ ...formData, envVars: newVars });
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Value</label>
                    <div className="relative">
                      <Input 
                        type={v.isSecret ? "password" : "text"}
                        placeholder="••••••••" 
                        value={v.value}
                        onChange={(e) => {
                          const newVars = [...formData.envVars];
                          newVars[i].value = e.target.value;
                          setFormData({ ...formData, envVars: newVars });
                        }}
                      />
                      <button 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        onClick={() => {
                          const newVars = [...formData.envVars];
                          newVars[i].isSecret = !newVars[i].isSecret;
                          setFormData({ ...formData, envVars: newVars });
                        }}
                      >
                        <Lock className={cn("w-4 h-4", v.isSecret ? "text-indigo-500" : "")} />
                      </button>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-400 hover:text-red-500 hover:bg-red-50"
                    onClick={() => {
                      const newVars = formData.envVars.filter((_, idx) => idx !== i);
                      setFormData({ ...formData, envVars: newVars });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Review Application</h2>
            <Card>
              <CardContent className="p-6 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="py-4 flex justify-between">
                  <span className="text-slate-500 text-sm">Source</span>
                  <div className="flex items-center gap-2 font-bold">
                    <Github className="w-4 h-4" />
                    repo: procloudify/api-server
                  </div>
                </div>
                <div className="py-4 flex justify-between">
                  <span className="text-slate-500 text-sm">App Name</span>
                  <span className="font-bold">{formData.name || 'api-server'}</span>
                </div>
                <div className="py-4 flex justify-between">
                  <span className="text-slate-500 text-sm">Region</span>
                  <span className="font-bold">US East (N. Virginia)</span>
                </div>
                <div className="py-4 flex justify-between">
                  <span className="text-slate-500 text-sm">Resource Plan</span>
                  <Badge variant="info" className="font-bold">{formData.plan.toUpperCase()} ($5/mo)</Badge>
                </div>
                <div className="py-4 flex justify-between">
                  <span className="text-slate-500 text-sm">Environment Variables</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{formData.envVars.filter(v => v.key).length} Defined</span>
                </div>
              </CardContent>
            </Card>
            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl flex gap-3 text-sm text-amber-700 dark:text-amber-400">
              <Info className="w-5 h-5 flex-shrink-0" />
              <p>Deployment will begin immediately after confirmation. This usually takes about 2-3 minutes depending on your image size.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Application</h1>
          <p className="text-slate-500 text-sm">Let's get your Docker container up and running.</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between px-2">
        {steps.map((s, i) => (
          <React.Fragment key={s.key}>
            <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => i < currentStepIndex && setStep(s.key)}>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                i <= currentStepIndex 
                  ? "border-indigo-600 bg-indigo-600 text-white" 
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400"
              )}>
                {i < currentStepIndex ? <Check className="w-5 h-5" /> : <span className="text-sm font-bold">{i + 1}</span>}
              </div>
              <span className={cn(
                "hidden sm:block text-[10px] font-bold uppercase tracking-widest",
                i <= currentStepIndex ? "text-indigo-600" : "text-slate-400"
              )}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5 mx-2 rounded",
                i < currentStepIndex ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-800"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="min-h-[400px]">
        {renderStep()}
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
        <Button variant="ghost" onClick={handleBack}>
          {step === 'source' ? 'Cancel' : 'Back'}
        </Button>
        <Button 
          className="min-w-[120px]" 
          onClick={handleNext}
          isLoading={loading}
        >
          {step === 'review' ? 'Deploy App' : 'Continue'}
          {step !== 'review' && <ChevronRight className="ml-2 w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
