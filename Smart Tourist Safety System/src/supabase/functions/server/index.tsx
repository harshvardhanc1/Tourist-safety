import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Create Supabase client with service role key
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Health check endpoint
app.get("/make-server-bd8c6dc5/health", (c) => {
  return c.json({ status: "ok" });
});

// Signup endpoint for government officers
app.post("/make-server-bd8c6dc5/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, department, badge_id } = body;

    console.log('Signup attempt for:', email);

    if (!email || !password || !name || !department || !badge_id) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Create user with auto-confirmed email
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name, 
        department, 
        badge_id,
        role: 'authority',
        department_name: department === 'police' ? 'Goa Police' : 
                        department === 'tourism' ? 'Tourism Department' :
                        department === 'medical' ? 'Emergency Medical Services' :
                        department === 'coastal' ? 'Coastal Security' : department
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Supabase signup error:', error);
      
      // Check if user already exists - handle various error messages and codes
      if (error.code === 'email_exists' || 
          error.message?.includes('already been registered') ||
          error.message?.includes('already registered') || 
          error.message?.includes('User already registered') ||
          error.message?.includes('email address has already been registered')) {
        
        console.log('User already exists, treating as success:', email);
        return c.json({ 
          message: "User already exists - ready to login", 
          user: { 
            email: email,
            metadata: { name, department, badge_id, role: 'authority' }
          } 
        });
      }
      
      return c.json({ error: error.message }, 400);
    }

    console.log('User created successfully:', data.user?.email);

    return c.json({ 
      message: "Officer account created successfully", 
      user: { 
        id: data.user.id, 
        email: data.user.email,
        metadata: data.user.user_metadata 
      } 
    });

  } catch (error) {
    console.error('Signup exception:', error);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Protected route example - requires authentication
app.get("/make-server-bd8c6dc5/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: "Authorization token required" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    return c.json({ 
      user: {
        id: user.id,
        email: user.email,
        metadata: user.user_metadata,
        last_sign_in: user.last_sign_in_at
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    return c.json({ error: "Internal server error while fetching profile" }, 500);
  }
});

Deno.serve(app.fetch);