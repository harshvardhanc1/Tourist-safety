import { projectId, publicAnonKey } from './supabase/info';

// This utility function creates a demo user account for testing
// It should be called once to set up the demo account

export async function createDemoUser() {
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
      console.error('Demo user creation failed:', data.error);
      return { success: false, error: data.error };
    }

    console.log('Demo user created successfully:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Error creating demo user:', error);
    return { success: false, error: 'Network error' };
  }
}

// Uncomment the line below and run this file to create the demo user
// createDemoUser();