import React, { useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import AppRoutes from './routes';
import { NAVIGATION_ITEMS } from './navigation';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import AppProviders from './providers';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentItem = NAVIGATION_ITEMS.find(
    (item) =>
      item.path === location.pathname ||
      (item.path !== '/' && location.pathname.startsWith(item.path))
  );

  useEffect(() => {
    const titles = {
      '/': 'Dashboard | SatQuery AI',
      '/analyze': 'Analyze | SatQuery AI',
      '/results': 'Results | SatQuery AI',
      '/history': 'History | SatQuery AI',
      '/reports': 'Reports | SatQuery AI',
      '/settings': 'Settings | SatQuery AI',
    };
    document.title =
      titles[location.pathname] ||
      (currentItem ? `${currentItem.label} | SatQuery AI` : 'Page Not Found | SatQuery AI');
  }, [location.pathname, currentItem]);

  const handleNavigate = (item) => {
    navigate(item.path);
  };

  return (
    <AppShell
      navigationItems={NAVIGATION_ITEMS}
      activeRoute={location.pathname}
      onNavigate={handleNavigate}
      pageTitle={currentItem ? currentItem.label : 'SatQuery AI'}
    >
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </AppShell>
  );
}

export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
