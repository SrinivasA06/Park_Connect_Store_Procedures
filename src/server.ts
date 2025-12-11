import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase configuration
const SUPABASE_URL = 'https://ndbzwrhgfrspeiycrnxs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kYnp3cmhnZnJzcGVpeWNybnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MTc1NzYsImV4cCI6MjA3NzA5MzU3Nn0.TRPZcIqEe4eWmG0w8e_Q-V1pQlB_TKVNzMc7lbR7Fko';

// Types
interface BookingData {
  [key: string]: any;
}

interface SupabaseError {
  message?: string;
  hint?: string;
  details?: string;
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ============================================
// OWNER DASHBOARD ENDPOINTS
// ============================================

// API endpoint to fetch 2 weeks income comparison
app.post('/api/owner/2weeks-income', async (req: Request, res: Response): Promise<void> => {
    try {
        const { owner_id } = req.body;
        
        if (!owner_id) {
            res.status(400).json({ 
                error: 'Bad request',
                message: 'owner_id is required'
            });
            return;
        }
        
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/get_owner_2weeks_income`,
            {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({ p_owner_id: parseInt(owner_id) })
            }
        );
        
        if (!response.ok) {
            const errorData: SupabaseError = await response.json();
            res.status(response.status).json({
                error: errorData.message || 'Failed to fetch 2 weeks income',
                details: errorData.hint || errorData.details
            });
            return;
        }
        
        const data: BookingData[] = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching 2 weeks income:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// API endpoint to fetch 2 weeks bookings comparison
app.post('/api/owner/2weeks-bookings', async (req: Request, res: Response): Promise<void> => {
    try {
        const { owner_id } = req.body;
        
        if (!owner_id) {
            res.status(400).json({ 
                error: 'Bad request',
                message: 'owner_id is required'
            });
            return;
        }
        
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/get_owner_2weeks_bookings`,
            {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({ p_owner_id: parseInt(owner_id) })
            }
        );
        
        if (!response.ok) {
            const errorData: SupabaseError = await response.json();
            res.status(response.status).json({
                error: errorData.message || 'Failed to fetch 2 weeks bookings',
                details: errorData.hint || errorData.details
            });
            return;
        }
        
        const data: BookingData[] = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching 2 weeks bookings:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// API endpoint to fetch owner average rating
app.post('/api/owner/rating', async (req: Request, res: Response): Promise<void> => {
    try {
        const { owner_id } = req.body;
        
        if (!owner_id) {
            res.status(400).json({ 
                error: 'Bad request',
                message: 'owner_id is required'
            });
            return;
        }
        
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/get_owner_average_rating`,
            {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({ p_owner_id: parseInt(owner_id) })
            }
        );
        
        if (!response.ok) {
            const errorData: SupabaseError = await response.json();
            res.status(response.status).json({
                error: errorData.message || 'Failed to fetch owner rating',
                details: errorData.hint || errorData.details
            });
            return;
        }
        
        const data: BookingData[] = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching owner rating:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// ============================================
// ADMIN DASHBOARD ENDPOINTS
// ============================================

// API endpoint to fetch total platform revenue
app.post('/api/admin/platform-revenue', async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/ad_get_total_platform_revenue`,
            {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({})
            }
        );
        
        if (!response.ok) {
            const errorData: SupabaseError = await response.json();
            res.status(response.status).json({
                error: errorData.message || 'Failed to fetch platform revenue',
                details: errorData.hint || errorData.details
            });
            return;
        }
        
        const data: BookingData[] = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching platform revenue:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// API endpoint to fetch total spaces listed
app.post('/api/admin/total-spaces', async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/ad_get_total_spaces_listed`,
            {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({})
            }
        );
        
        if (!response.ok) {
            const errorData: SupabaseError = await response.json();
            res.status(response.status).json({
                error: errorData.message || 'Failed to fetch total spaces',
                details: errorData.hint || errorData.details
            });
            return;
        }
        
        const data: BookingData[] = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching total spaces:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// API endpoint to fetch total users
app.post('/api/admin/total-users', async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/ad_get_total_users`,
            {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({})
            }
        );
        
        if (!response.ok) {
            const errorData: SupabaseError = await response.json();
            res.status(response.status).json({
                error: errorData.message || 'Failed to fetch total users',
                details: errorData.hint || errorData.details
            });
            return;
        }
        
        const data: BookingData[] = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching total users:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// ============================================
// HEALTH CHECK
// ============================================

// Health check endpoint
app.get('/api/health', (req: Request, res: Response): void => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ============================================
// HTML PAGE ROUTES
// ============================================

// Serve the owner dashboard HTML page
app.get('/', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, '../public', 'owner-dashboard.html'));
});

// Serve the admin dashboard HTML page
app.get('/admin', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, '../public', 'admin.html'));
});

// ============================================
// ERROR HANDLERS
// ============================================

// 404 handler
app.use((req: Request, res: Response): void => {
    res.status(404).json({ error: 'Not found' });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, (): void => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`📊 Owner Dashboard: http://localhost:${PORT}/`);
    console.log(`🔧 Admin Dashboard: http://localhost:${PORT}/admin`);
    console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;