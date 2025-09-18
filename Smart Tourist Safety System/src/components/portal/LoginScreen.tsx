import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Shield, Lock, Building, AlertCircle, UserPlus } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function LoginScreen() {
  const { signIn, loading } = useAuth();
  const { signUp } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [creatingDemo, setCreatingDemo] = useState(false);

  const createDemoUser = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bd8c6dc5/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          email: 'officer@gov-goa.in',
          password: 'SafeTour2024!',
          name: 'Rajesh Kumar',
          department: 'tourism',
          badge_id: 'GOA-TUR-2024-001'
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        // If user already exists, that's actually fine for our purposes
        if (response.status === 409 || data.error?.includes('already')) {
          console.log('Demo user already exists, proceeding with login');
          return { success: true, message: 'User already exists' };
        }
        throw new Error(data.error || 'Failed to create demo user');
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error creating demo user:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Network error' };
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      return;
    }

    const { error: authError } = await signIn(credentials.email, credentials.password);
    
    if (authError) {
      // If invalid credentials and using demo account, try to create it first
      if (authError.message?.includes('Invalid login credentials') && 
          credentials.email === 'officer@gov-goa.in') {
        setError('Demo user not found. Click "Create Demo User" button first.');
      } else {
        setError(authError.message || 'Login failed. Please check your credentials.');
      }
    }
  };

  const handleCreateAndLogin = async () => {
    setCreatingDemo(true);
    setError(null);

    try {
      // Create demo user
      const result = await createDemoUser();
      
      if (!result.success && result.error && !result.error.includes('already')) {
        setError(`Failed to create demo user: ${result.error}`);
        return;
      }

      // Set demo credentials
      setCredentials({
        email: 'officer@gov-goa.in',
        password: 'SafeTour2024!'
      });

      // Wait a moment for user creation to complete
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Try to sign in
      const { error: authError } = await signIn('officer@gov-goa.in', 'SafeTour2024!');
      
      if (authError) {
        setError(`Login failed after creating user: ${authError.message}`);
      }

    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setCreatingDemo(false);
    }
  };

  const handleSignUp = async () => {
    setError(null);
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password to sign up');
      return;
    }

    try {
      setCreatingDemo(true);
      const { error: signUpError } = await signUp(credentials.email, credentials.password, { name: 'New User' });
      if (signUpError) {
        setError(signUpError.message || 'Sign up failed');
        return;
      }

      // After successful signup, attempt sign in
      const { error: authError } = await signIn(credentials.email, credentials.password);
      if (authError) {
        setError(authError.message || 'Sign in after sign up failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setCreatingDemo(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="text-center bg-slate-900 text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16" />
          </div>
          <CardTitle className="text-xl">Authority Login</CardTitle>
          <p className="text-sm text-slate-300">Tourist Safety Control System</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div>
              <Label htmlFor="email">Official Email</Label>
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                placeholder="officer@gov-goa.in"
                className="flex items-center"
                disabled={loading || creatingDemo}
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Enter your password"
                disabled={loading || creatingDemo}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800"
              disabled={loading || creatingDemo || !credentials.email || !credentials.password}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Secure Login
                </>
              )}
            </Button>
            <div className="mt-2">
              <Button 
                onClick={handleSignUp}
                variant="ghost"
                className="w-full"
                disabled={loading || creatingDemo}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign up
              </Button>
            </div>
          </form>

          <div className="mt-4">
            <Button 
              onClick={handleCreateAndLogin}
              variant="outline"
              className="w-full"
              disabled={loading || creatingDemo}
            >
              {creatingDemo ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600 mr-2"></div>
                  Creating Demo User...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Demo User & Login
                </>
              )}
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-800">
              <Building className="h-4 w-4" />
              <span className="text-sm">Government of Goa</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Authorized personnel only. All activities are logged and monitored.
            </p>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-500">Email: officer@gov-goa.in</p>
            <p className="text-xs text-gray-500">Password: SafeTour2024!</p>
            <p className="text-xs text-gray-400 mt-1">Use "Create Demo User & Login" if this is your first time</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}