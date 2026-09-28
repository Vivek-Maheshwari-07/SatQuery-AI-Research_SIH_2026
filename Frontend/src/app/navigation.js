import {
  LayoutDashboard,
  Scan,
  Layers,
  History as HistoryIcon,
  FileText,
  Settings as SettingsIcon,
} from 'lucide-react';

/**
 * Pure data configuration for application navigation items.
 * Passed into AppShell / Sidebar as props per spec section 14.
 */
export const NAVIGATION_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    id: 'analyze',
    label: 'Analyze',
    path: '/analyze',
    icon: Scan,
  },
  {
    id: 'results',
    label: 'Results',
    path: '/results',
    icon: Layers,
  },
  {
    id: 'history',
    label: 'History',
    path: '/history',
    icon: HistoryIcon,
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: FileText,
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: SettingsIcon,
  },
];
