import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from './portal/LoginScreen';
import { Dashboard } from './portal/Dashboard';
import { AlertsPanel } from './portal/AlertsPanel';
import { TouristDatabase } from './portal/TouristDatabase';
import { Button } from './ui/button';
import { LayoutDashboard, AlertTriangle, Users, LogOut } from 'lucide-react';

export function AuthorityPortal() {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'alerts' | 'database'>('dashboard');

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Logout error:', error.message);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'alerts':
        return <AlertsPanel />;
      case 'database':
        return <TouristDatabase />;
      default:
        return <Dashboard />;
    }
  };

  // Extract user info from metadata or email
  const userInfo = user.user_metadata || {};
  const displayName = userInfo.name || userInfo.department_name || user.email?.split('@')[0] || 'Officer';

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl">Tourist Safety Control Center</h1>
            <p className="text-sm text-slate-300">Government of Goa - Tourism Department</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Officer: {displayName}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-slate-600 text-white hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-slate-100 border-b">
        <div className="flex space-x-1 p-2">
          <Button
            variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center space-x-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
          <Button
            variant={activeTab === 'alerts' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('alerts')}
            className="flex items-center space-x-2"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Alerts</span>
          </Button>
          <Button
            variant={activeTab === 'database' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('database')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Tourist Database</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[600px] overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}