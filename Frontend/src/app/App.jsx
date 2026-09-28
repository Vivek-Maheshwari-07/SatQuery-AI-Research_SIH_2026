import React from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import AppRoutes from './routes';
import { NAVIGATION_ITEMS } from './navigation';

import AppProviders from './providers';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentItem = NAVIGATION_ITEMS.find(
    (item) =>
      item.path === location.pathname ||
      (item.path !== '/' && location.pathname.startsWith(item.path))
  );

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
      <AppRoutes />
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
