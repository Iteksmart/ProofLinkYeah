/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tab = 'product' | 'consulting' | 'platform' | 'verify';

export interface TimelineStep {
  dayNumber: number;
  dayRange: string;
  title: string;
  tasks: string[];
  status: 'completed' | 'active' | 'pending';
}

export interface LedgerItem {
  id: string;
  type: 'cve' | 'drift' | 'audit' | 'threat';
  title: string;
  target: string;
  actionText: string;
  txHash: string;
  status: 'remediated' | 'active' | 'warning';
  timestamp: string;
}

export interface IncidentItem {
  id: string;
  name: string;
  details: string;
  severity: 'critical' | 'warn' | 'resolved';
  timestamp: string;
  active: boolean;
  assignedAgent?: string;
  execCommand?: string;
  cmdOutput?: string;
}

export const INITIAL_TIMELINE: TimelineStep[] = [
  {
    dayNumber: 1,
    dayRange: 'Day 1-7',
    title: 'Observability Mapping',
    tasks: [
      'Deploy sensor net architecture across hybrid clusters',
      'Establish cryptographic baseline mapping',
      'Initial zero-day vulnerability indexing'
    ],
    status: 'completed',
  },
  {
    dayNumber: 14,
    dayRange: 'Day 8-21 (Current Phase)',
    title: 'Policy Enforcement & Fixes',
    tasks: [
      'Activate UAIO (Universal AI Orchestrator) core loop',
      'Auto-patch critical CVE liabilities in 500ms',
      'Enforce absolute IAM zero-trust validation at the edge'
    ],
    status: 'active',
  },
  {
    dayNumber: 30,
    dayRange: 'Day 22-30',
    title: 'Continuous Proof Handover',
    tasks: [
      'Generate immutable, Bitcoin-anchored audit trails',
      'Deploy real-time executive compliance dashboarding',
      'Finalize hands-free autonomic handover protocols'
    ],
    status: 'pending',
  }
];

export const INITIAL_LEDGER: LedgerItem[] = [
  {
    id: 'PLR-20260623-14a2',
    type: 'drift',
    title: 'IAM Policy Drift Rectified',
    target: 'Role: DB_Admin_Temp',
    actionText: 'Reverted to baseline standard configuration',
    txHash: '0x3c4d9a8b...1a2b5c6d',
    status: 'remediated',
    timestamp: '10:45:10'
  },
  {
    id: 'PLR-20260623-09e4',
    type: 'cve',
    title: 'CVE-2024-0412 Critical Vulnerability Patched',
    target: 'Cluster: us-east-prod-01',
    actionText: 'Patched via OctoAI Autonomic Hotfix',
    txHash: '0x7a8b9c2d...8e9f0a1b',
    status: 'remediated',
    timestamp: '10:44:35'
  },
  {
    id: 'PLR-20260623-01f2',
    type: 'threat',
    title: 'Brute force network scan neutralized',
    target: 'Ingress: API-Gateway-Alpha',
    actionText: 'Assigned: Agent-SecOp-Alpha [IP BLOCKLISTED]',
    txHash: '0x1c2b5d4e...3a8f9c2d',
    status: 'warning',
    timestamp: '10:42:15'
  }
];

export const INITIAL_INCIDENTS: IncidentItem[] = [
  {
    id: 'INC-4992',
    name: 'Firewall Breach Attempt',
    details: 'Multiple unauthorized handshakes detected on Port 443.',
    severity: 'critical',
    timestamp: '10:42:01',
    active: true,
    assignedAgent: 'Agent-SecOp-Alpha',
    execCommand: 'iptables -A INPUT -s 192.168.1.50 -j DROP',
    cmdOutput: 'SUCCESS: Rule propagated globally across 45 nodes.'
  },
  {
    id: 'INC-4991',
    name: 'Kubernetes Pod Out-Of-Memory Leak',
    details: 'Cluster heap memory utilization spiked to 98% in payment-svc.',
    severity: 'critical',
    timestamp: '10:41:45',
    active: false,
    assignedAgent: 'Agent-K8s-Healer',
    execCommand: 'kubectl rollout restart deployment/payment-svc',
    cmdOutput: 'SUCCESS: Pod rolling restarted. Memory returned to 34%.'
  },
  {
    id: 'INC-4990',
    name: 'Identity Provider Baseline Drift',
    details: 'Privilege escalation attempt detected on guest credentials.',
    severity: 'warn',
    timestamp: '10:39:12',
    active: false,
    assignedAgent: 'Agent-IAM-Sentry',
    execCommand: 'vault token revoke -mode=path auth/token/temp_db_admin',
    cmdOutput: 'SUCCESS: Unauthorized session token revoked. IAM enforcement rigid.'
  }
];
