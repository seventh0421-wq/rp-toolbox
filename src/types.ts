/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ToolItem {
  id: string;
  title: string;
  enTitle: string;
  description: string;
  longDescription: string;
  category: 'roleplay' | 'music' | 'housing' | 'social' | 'system';
  version: string;
  status: 'stable' | 'beta' | 'maintenance' | 'deprecated';
  statusText: string;
  defaultUrl: string;
  features: string[];
  mockUpType: 'profileCard' | 'macroHelper' | 'housingBudget' | 'characterGraph' | 'bardMusic';
}

export type ToolCategory = 'all' | 'roleplay' | 'music' | 'housing' | 'social';
