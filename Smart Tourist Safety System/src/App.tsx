import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AuthorityPortal } from './components/AuthorityPortal';
import TestSupabase from './supabase/TestSupabase';
import { Shield } from 'lucide-react';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl text-blue-900">SafeTour Authority Portal</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <TestSupabase />
        </div>
        <div className="flex justify-center items-start min-h-[calc(100vh-4rem)] p-4">
          <AuthorityPortal />
        </div>
      </div>
    </AuthProvider>
  );
}