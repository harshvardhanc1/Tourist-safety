import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface UserSetupProps {
  onClose?: () => void;
}

export function UserSetup({ onClose }: UserSetupProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    department: '',
    badge_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const createUser = async (userData: typeof formData) => {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bd8c6dc5/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await createUser(formData);
      setMessage({ type: 'success', text: 'User account created successfully!' });
      setFormData({
        email: '',
        password: '',
        name: '',
        department: '',
        badge_id: ''
      });
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to create user' });
    } finally {
      setLoading(false);
    }
  };

  const createDemoUser = async () => {
    setLoading(true);
    setMessage(null);

    try {
      await createUser({
        email: 'officer@gov-goa.in',
        password: 'SafeTour2024!',
        name: 'Rajesh Kumar',
        department: 'tourism',
        badge_id: 'GOA-TUR-2024-001'
      });
      setMessage({ type: 'success', text: 'Demo user created successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to create demo user' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus className="h-5 w-5" />
          <span>Create Authority Account</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            {message.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="flex space-x-2">
          <Button
            onClick={createDemoUser}
            disabled={loading}
            variant="outline"
            className="flex-1"
          >
            Create Demo User
          </Button>
          {onClose && (
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or create custom user</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Officer Name"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="email">Government Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="officer@gov-goa.in"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Select value={formData.department} onValueChange={(value) => 
              setFormData({...formData, department: value})
            } disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="police">Goa Police</SelectItem>
                <SelectItem value="tourism">Tourism Department</SelectItem>
                <SelectItem value="medical">Emergency Medical Services</SelectItem>
                <SelectItem value="coastal">Coastal Security</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="badge_id">Badge/ID Number</Label>
            <Input
              id="badge_id"
              type="text"
              value={formData.badge_id}
              onChange={(e) => setFormData({...formData, badge_id: e.target.value})}
              placeholder="GOA-DEPT-2024-001"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Strong password"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !formData.email || !formData.password || !formData.name || !formData.department || !formData.badge_id}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}