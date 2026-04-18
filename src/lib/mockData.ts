export interface AppSummary {
  id: string;
  name: string;
  status: 'running' | 'failed' | 'deploying' | 'paused';
  runtime: string;
  cpu: string;
  ram: string;
  domain: string;
  lastDeploy: string;
  region: string;
  plan: string;
}

export const MOCK_APPS: AppSummary[] = [
  {
    id: '1',
    name: 'api-service',
    status: 'running',
    runtime: 'Docker (Go 1.21)',
    cpu: '0.5 vCPU',
    ram: '512 MB',
    domain: 'api.dockerflow.dev',
    lastDeploy: '2h ago',
    region: 'us-east-1',
    plan: 'Starter',
  },
  {
    id: '2',
    name: 'frontend-web',
    status: 'running',
    runtime: 'Docker (Node.js 20)',
    cpu: '1 vCPU',
    ram: '1 GB',
    domain: 'webapp.dockerflow.dev',
    lastDeploy: '5h ago',
    region: 'eu-central-1',
    plan: 'Growth',
  },
  {
    id: '3',
    name: 'worker-queue',
    status: 'deploying',
    runtime: 'Docker (Python 3.11)',
    cpu: '0.25 vCPU',
    ram: '256 MB',
    domain: 'worker.internal',
    lastDeploy: 'Just now',
    region: 'us-west-2',
    plan: 'Starter',
  },
  {
    id: '4',
    name: 'data-analyzer',
    status: 'failed',
    runtime: 'Docker (Rust)',
    cpu: '2 vCPU',
    ram: '4 GB',
    domain: 'analyzer.dockerflow.dev',
    lastDeploy: '1d ago',
    region: 'ap-southeast-1',
    plan: 'Pro',
  },
  {
    id: '5',
    name: 'legacy-app',
    status: 'paused',
    runtime: 'Docker (Ruby)',
    cpu: '0.5 vCPU',
    ram: '512 MB',
    domain: 'legacy.dockerflow.dev',
    lastDeploy: '3d ago',
    region: 'us-east-1',
    plan: 'Starter',
  },
];

export const MOCK_DEPLOYMENTS = [
  { id: 'd1', appId: '1', status: 'success', commit: 'Initial production deploy', source: 'main', trigger: 'Git Push', timestamp: '2026-04-17 10:30' },
  { id: 'd2', appId: '1', status: 'success', commit: 'Fix: memory leak in auth middleware', source: 'main', trigger: 'Git Push', timestamp: '2026-04-17 08:15' },
  { id: 'd3', appId: '2', status: 'success', commit: 'Feature: dark mode support', source: 'main', trigger: 'Manual', timestamp: '2026-04-16 14:00' },
  { id: 'd4', appId: '3', status: 'in-progress', commit: 'Update: dependency security patches', source: 'develop', trigger: 'Git Push', timestamp: '2026-04-17 14:35' },
  { id: 'd5', appId: '4', status: 'failed', commit: 'Bug: broken entrypoint command', source: 'main', trigger: 'Git Push', timestamp: '2026-04-16 09:20' },
];

export const MOCK_METRICS = [
  { time: '09:00', cpu: 20, ram: 45, network: 12 },
  { time: '10:00', cpu: 35, ram: 50, network: 18 },
  { time: '11:00', cpu: 45, ram: 55, network: 25 },
  { time: '12:00', cpu: 30, ram: 52, network: 15 },
  { time: '13:00', cpu: 60, ram: 58, network: 40 },
  { time: '14:00', cpu: 40, ram: 50, network: 22 },
];

export const MOCK_LOGS = [
  { timestamp: '2026-04-17 14:30:01', level: 'INFO', message: 'Starting server on port 3000...' },
  { timestamp: '2026-04-17 14:30:05', level: 'INFO', message: 'Database connection established.' },
  { timestamp: '2026-04-17 14:31:12', level: 'WARN', message: 'Memory usage exceeding 80% limit.' },
  { timestamp: '2026-04-17 14:32:45', level: 'INFO', message: 'GET /api/v1/health - 200 OK' },
  { timestamp: '2026-04-17 14:33:10', level: 'ERROR', message: 'Unauthorized access attempt at /api/v1/admin.' },
  { timestamp: '2026-04-17 14:34:00', level: 'INFO', message: 'Syncing worker nodes...' },
];

export const MOCK_NOTIFICATIONS = [
  { id: 'n1', title: 'Deployment Success', message: 'App "api-service" has been deployed successfully.', time: '2h ago', type: 'success', read: false },
  { id: 'n2', title: 'Backup Completed', message: 'Daily backup for "frontend-web" is ready.', time: '5h ago', type: 'info', read: true },
  { id: 'n3', title: 'SSL Certificate Issued', message: 'Custom domain webapp.dockerflow.dev is now secure.', time: '1d ago', type: 'success', read: true },
  { id: 'n4', title: 'Resource Limit Warning', message: 'High CPU usage detected on "data-analyzer".', time: '1d ago', type: 'warning', read: false },
];

export const MOCK_DOMAINS = [
  { id: 'dm1', domain: 'api.dockerflow.dev', type: 'Auto-generated', status: 'Active', ssl: 'Enabled' },
  { id: 'dm2', domain: 'api.example.com', type: 'Custom', status: 'Active', ssl: 'Enabled' },
  { id: 'dm3', domain: 'test.example.com', type: 'Custom', status: 'Verification Pending', ssl: 'Issue Pending' },
];

export const MOCK_ENV_VARS = [
  { id: 'e1', key: 'DATABASE_URL', value: 'postgres://user:pass@host:5432/db', secret: true },
  { id: 'e2', key: 'API_KEY', value: 'df_live_51M...', secret: true },
  { id: 'e3', key: 'NODE_ENV', value: 'production', secret: false },
  { id: 'e4', key: 'PORT', value: '3000', secret: false },
];

export const MOCK_TEAM = [
  { id: 'u1', name: 'Alex Johnson', email: 'alex@example.com', role: 'Owner', avatar: 'https://picsum.photos/seed/alex/100/100' },
  { id: 'u2', name: 'Sarah Miller', email: 'sarah@example.com', role: 'Admin', avatar: 'https://picsum.photos/seed/sarah/100/100' },
  { id: 'u3', name: 'Mike Chen', email: 'mike@example.com', role: 'Developer', avatar: 'https://picsum.photos/seed/mike/100/100' },
  { id: 'u4', name: 'Emily Davis', email: 'emily@example.com', role: 'Billing', avatar: 'https://picsum.photos/seed/emily/100/100' },
];
