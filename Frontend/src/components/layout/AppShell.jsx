import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * AppShell layout component following spec section 13 & 49.
 * Provides the core responsive frame containing Sidebar, Topbar, and Main Content.
 *
 * @param {Object} props
 * @param {Array<{ id: string, label: string, path: string, icon: any, badge?: any }>} props.navigationItems
 * @param {string} props.activeRoute
 * @param {(item: { path: string }) => void} props.onNavigate
 * @param {string} [props.pageTitle]
 * @param {string} [props.pageSubtitle]
 * @param {React.ReactNode} [props.topbarActions]
 * @param {React.ReactNode} props.children
 */
export function AppShell({
  navigationItems = [],
  activeRoute,
  onNavigate,
  pageTitle,
  pageSubtitle,
  topbarActions,
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface font-sans text-text-primary">
      {/* Sidebar Navigation */}
      <Sidebar
        items={navigationItems}
        activeItem={activeRoute}
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        <Topbar
          title={pageTitle}
          subtitle={pageSubtitle}
          actions={topbarActions}
          onToggleSidebar={toggleSidebar}
        />

        <div className="flex-1 flex flex-col min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AppShell;
